import type { Expense as PrismaExpense } from "@prisma/client"

import { ExpenseSchema } from "@/types/forms/expense"

import QUERY_KEYS from "@/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import createExpense from "@/actions/expenses/mutations/create-expense"

type Expense = Omit<PrismaExpense, "createdAt" | "id" | "updatedAt">
type InfiniteQueryData = { pageParams: number[]; pages: Expense[][] }
type MutationContext = { cacheBeforeMutation?: InfiniteQueryData; loadingToastId: number | string }

/*
 * Id gets created after item is added to the database,
 * need to invalidate the cache when creating the expense because the id is not known until the expense is created
 * and if the cache is not invalidated, if you try to edit or delete that expense with its id,
 * you will get an error because the cache doesn't have the id because you didn't re-fetch the data from the database
 */
export default function useCreateExpenseMutation() {
    const queryClient = useQueryClient()

    return useMutation<null | PrismaExpense, Error, Expense, MutationContext>({
        mutationFn: (expense: Expense) => createExpense(expense),

        onError(error, expense, context) {
            console.error(`Error Creating Expense: ${error}`)
            toast.error(`Error Creating Expense ${expense.description}`)

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

            // show a loading toast while the expense is being created, this will be dismissed when the expense is created
            const loadingToastId = toast.loading(`Attempting To Create Expense: ${expense.description}`, {
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
            if (context?.loadingToastId) {
                toast.dismiss(context.loadingToastId)
            }

            // invalidate the cache after expense creation, causes a re-fetch of the data from the database, more expensive but necessary for when the user creates a record in the table
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(expense.userId),
            })
        },

        onSuccess(_data, expense, _context) {
            toast.success(`Successfully Created Expense: ${expense.description} `)
        },
    })
}
