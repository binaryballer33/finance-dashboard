import type { Transaction as PrismaTransaction } from "@prisma/client"

import { TransactionSchema } from "@/types/forms/transaction"

import QUERY_KEYS from "@/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import updateTransaction from "@/actions/transactions/mutations/update-transaction"

type Transaction = Omit<PrismaTransaction, "createdAt" | "updatedAt">
type MutationContext = { loadingToastId: number | string }

/*
 * Id gets created after item is added to the database,
 * need to invalidate the cache when creating the card because the id is not known until the card is created
 * and if the cache is not invalidated, if you try to edit or delete that card with its id,
 * you will get an error because the cache doesn't have the id because you didn't re-fetch the data from the database
 */
export default function useUpdateTransactionMutation() {
    const queryClient = useQueryClient()

    return useMutation<null | PrismaTransaction, Error, Transaction, MutationContext>({
        mutationFn: (transaction: Transaction) => updateTransaction(transaction),

        onError(error, transaction, _context) {
            console.error(`Error Updating Transaction: ${error}`)
            toast.error(`Error Updating Transaction ${transaction.description}`)
        },

        onMutate: async (transaction) => {
            // if there's a validation error, the mutation will not be called and the onError will be called
            TransactionSchema.parse(transaction)

            // show a loading toast while the transaction is being created, this will be dismissed when the transaction is created
            const loadingToastId = toast.loading(`Attempting To Update Transaction: ${transaction.description}`, {
                duration: 500,
            })

            return { loadingToastId }
        },

        onSettled: async (_data, _error, transaction, context) => {
            if (context?.loadingToastId) {
                toast.dismiss(context.loadingToastId)
            }
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.GET_ALL_TRANSACTIONS_BY_USER_ID(transaction.userId),
            })
        },

        onSuccess(_data, transaction, _context) {
            toast.success(`Successfully Updated Transaction: ${transaction.description}`)
        },
    })
}
