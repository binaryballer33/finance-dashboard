import type { Expense as PrismaExpense } from "@prisma/client"

import { ExpenseSchema } from "@/types/forms/expense"

import QUERY_KEYS from "@/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import deleteExpense from "@/actions/expenses/mutations/delete-expense"

type Expense = Omit<PrismaExpense, "createdAt" | "updatedAt">
type InfiniteQueryData = { pageParams: number[]; pages: Expense[][] }
type MutationContext = { cacheBeforeMutation?: InfiniteQueryData; loadingToastId: number | string }

export default function useDeleteExpenseMutation() {
    const queryClient = useQueryClient()

    return useMutation<null | PrismaExpense, Error, Expense, MutationContext>({
        mutationFn: (expense: Expense) => deleteExpense(expense),

        mutationKey: QUERY_KEYS.DELETE_EXPENSE,

        onError(error, expense, context) {
            console.error(`Error Deleting Expense: ${error}`)
            toast.error(`Error Deleting Expense ${expense.description}`)

            // if there is an error with the db call after doing the optimistic update, rollback the update using the cache
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

            // show a loading toast while the expense is being deleted, this will be dismissed when the expense is deleted
            const loadingToastId = toast.loading(`Attempting To Delete Expense: ${expense.description}`, {
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

            // return a context object with the previous state of the cache in case we need to rollback in the onError
            return { cacheBeforeMutation, loadingToastId }
        },

        onSettled: async (_data, _error, expense, context) => {
            if (context?.loadingToastId) toast.dismiss(context.loadingToastId)

            // invalidate the cache after expense deletion, causes a re-fetch of the data from the database, more expensive
            // await queryClient.invalidateQueries({
            //     queryKey: QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(expense.userId),
            // })

            // update local cache with the updated expense
            queryClient.setQueryData(
                QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(expense.userId),
                (oldData: InfiniteQueryData | undefined) => {
                    if (!oldData) return oldData

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) => page.filter((oldExpense) => oldExpense.id !== expense.id)),
                    }
                },
            )
        },

        onSuccess(_data, expense, _context) {
            toast.success(`Successfully Deleted Expense: ${expense.description}`)
        },
    })
}
