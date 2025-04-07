import type { Transaction as PrismaTransaction } from "@prisma/client"

import { TransactionSchema } from "@/types/forms/transaction"

import QUERY_KEYS from "@/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import deleteTransaction from "@/actions/transactions/mutations/delete-transaction"

type Transaction = Omit<PrismaTransaction, "createdAt" | "updatedAt">
type InfiniteQueryData = { pageParams: number[]; pages: Transaction[][] }
type MutationContext = { cacheBeforeMutation?: InfiniteQueryData; loadingToastId: number | string }

/*
 * Id gets created after item is added to the database,
 * need to invalidate the cache when creating the card because the id is not known until the card is created
 * and if the cache is not invalidated, if you try to edit or delete that card with its id,
 * you will get an error because the cache doesn't have the id because you didn't re-fetch the data from the database
 */
export default function useDeleteTransactionMutation() {
    const queryClient = useQueryClient()

    return useMutation<null | PrismaTransaction, Error, Transaction, MutationContext>({
        mutationFn: (transaction: Transaction) => deleteTransaction(transaction),

        onError(error, transaction, context) {
            console.error(`Error Deleting Transaction: ${error}`)
            toast.error(`Error Deleting Transaction ${transaction.description}`)

            // if there is an error with the db call after doing the optimistic update, rollback the update using the cache
            if (context?.cacheBeforeMutation) {
                queryClient.setQueryData(
                    QUERY_KEYS.GET_ALL_TRANSACTIONS_BY_USER_ID(transaction.userId),
                    context.cacheBeforeMutation,
                )
            }
        },

        onMutate: async (transaction) => {
            // if there's a validation error, the mutation will not be called and the onError will be called
            TransactionSchema.parse(transaction)

            // show a loading toast while the transaction is being created, this will be dismissed when the transaction is created
            const loadingToastId = toast.loading(`Attempting To Delete Transaction: ${transaction.description}`, {
                duration: 500,
            })

            // cancel any outgoing re-fetches (so they don't overwrite our optimistic update), this is asynchronous
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.GET_ALL_TRANSACTIONS_BY_USER_ID(transaction.userId),
            })

            // get the previous state of the cache before modifying the cache, for rollback on error purposes
            const cacheBeforeMutation = queryClient.getQueryData<InfiniteQueryData>(
                QUERY_KEYS.GET_ALL_TRANSACTIONS_BY_USER_ID(transaction.userId),
            )

            // return a context object with the previous state of the cache in case we need to rollback in the onError
            return { cacheBeforeMutation, loadingToastId }
        },

        onSettled: async (_data, _error, transaction, context) => {
            if (context?.loadingToastId) {
                toast.dismiss(context.loadingToastId)
            }

            // invalidate the cache after transaction deletion, causes a re-fetch of the data from the database, more expensive
            //     await queryClient.invalidateQueries({
            //         queryKey: QUERY_KEYS.GET_ALL_TRANSACTIONS_BY_USER_ID(transaction.userId),
            //     })

            // update local cache with the updated transaction
            queryClient.setQueryData(
                QUERY_KEYS.GET_ALL_TRANSACTIONS_BY_USER_ID(transaction.userId),
                (oldData: InfiniteQueryData | undefined) => {
                    if (!oldData) return oldData

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) =>
                            page.filter((oldTransaction) => oldTransaction.id !== transaction.id),
                        ),
                    }
                },
            )
        },

        onSuccess(_data, transaction, _context) {
            toast.success(`Successfully Deleted Transaction: ${transaction.description} `)
        },
    })
}
