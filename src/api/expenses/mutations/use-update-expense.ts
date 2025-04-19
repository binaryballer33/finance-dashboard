import type { Expense as PrismaExpense } from "@prisma/client"

import { ExpenseSchema } from "@/types/forms/expense"

import QUERY_KEYS from "@/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import updateExpense from "@/actions/expenses/mutations/update-expense"

type Expense = Omit<PrismaExpense, "createdAt" | "updatedAt">
type InfiniteQueryData = { pageParams: number[]; pages: Expense[][] }
type MutationContext = { cacheBeforeMutation?: InfiniteQueryData; loadingToastId: number | string }
/*
 * Id gets created after item is added to the database,
 * need to invalidate the cache when creating the card because the id is not known until the card is created
 * and if the cache is not invalidated, if you try to edit or delete that card with its id,
 * you will get an error because the cache doesn't have the id because you didn't re-fetch the data from the database
 */
export default function useUpdateExpenseMutation() {
    const queryClient = useQueryClient()

    return useMutation<null | PrismaExpense, Error, Expense, MutationContext>({
        mutationFn: (expense: Expense) => updateExpense(expense),

        onError(error, expense, context) {
            console.error(`Error Updating Expense: ${error}`)
            toast.error(`Error Updating Expense ${expense.description}`)

            if (context?.cacheBeforeMutation) {
                queryClient.setQueryData(
                    QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(expense.userId),
                    context.cacheBeforeMutation,
                )
            }
        },

        onMutate: async (expense) => {
            // if there's a validation error, the mutation will not be called and the onError will be called
            ExpenseSchema.parse(expense)

            // show a loading toast while the expense is being updated, this will be dismissed when the expense is updated
            const loadingToastId = toast.loading(`Attempting To Update Expense: ${expense.description}`, {
                duration: 500,
            })

            // cancel any outgoing re-fetches (so they don't overwrite our optimistic update), this is asynchronous
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(expense.userId),
            })

            // get the previous state of the cache before modifying the cache, for rollback on error purposes
            const cacheBeforeMutation = queryClient.getQueryData<InfiniteQueryData>(
                QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(expense.userId),
            )

            return { cacheBeforeMutation, loadingToastId }
        },

        onSettled: async (_data, _error, expense, context) => {
            if (context?.loadingToastId) toast.dismiss(context.loadingToastId)

            // invalidate the cache after expense update, causes a re-fetch of the data from the database, more expensive
            // await queryClient.invalidateQueries({
            //     queryKey: QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(expense.userId),
            // })

            // update local cache with the updated expense
            // optimistically update the cache to what it should be if there are no errors
            queryClient.setQueryData(
                QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(expense.userId),
                (oldData: InfiniteQueryData | undefined) => {
                    if (!oldData) return oldData

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) =>
                            page.map((oldExpense) => (oldExpense.id === expense.id ? expense : oldExpense)),
                        ),
                    }
                },
            )
        },

        onSuccess(_data, expense, _context) {
            toast.success(`Successfully Updated Expense: ${expense.description}`)
        },
    })
}
