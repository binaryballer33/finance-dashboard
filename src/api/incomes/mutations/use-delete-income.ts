import type { Income as PrismaIncome } from "@prisma/client"

import { IncomeSchema } from "@/types/forms/income"

import QUERY_KEYS from "@/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import deleteIncome from "@/actions/income/mutations/delete-income"

type Income = Omit<PrismaIncome, "createdAt" | "updatedAt">
type MutationContext = { cacheBeforeMutation?: PrismaIncome[]; loadingToastId: number | string }

/*
 * Id gets created after item is added to the database,
 * need to invalidate the cache when creating the card because the id is not known until the card is created
 * and if the cache is not invalidated, if you try to edit or delete that card with its id,
 * you will get an error because the cache doesn't have the id because you didn't re-fetch the data from the database
 */
export default function useDeleteIncomeMutation() {
    const queryClient = useQueryClient()

    return useMutation<null | PrismaIncome, Error, Income, MutationContext>({
        mutationFn: (income: Income) => deleteIncome(income),

        mutationKey: QUERY_KEYS.DELETE_INCOME,

        onError(error, income, context) {
            console.error(`Error Deleting Income: ${error}`)
            toast.error(`Error Deleting Income ${income.description}`)

            // if there is an error with the db call after doing the optimistic update, rollback the update using the cache
            if (context?.cacheBeforeMutation) {
                queryClient.setQueryData(
                    QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(income.userId),
                    context.cacheBeforeMutation,
                )
            }
        },

        onMutate: async (income) => {
            // if there's a validation error, the mutation will not be called and the onError will be called
            IncomeSchema.parse(income)

            // show a loading toast while the income is being created, this will be dismissed when the income is created
            const loadingToastId = toast.loading(`Attempting To Delete Income: ${income.description}`, {
                duration: 500,
            })

            // cancel any outgoing re-fetches (so they don't overwrite our optimistic update), this is asynchronous
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(income.userId),
            })

            // get the previous state of the cache before modifying the cache, for rollback on error purposes
            const cacheBeforeMutation = queryClient.getQueryData<PrismaIncome[]>(
                QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(income.userId),
            )

            // return a context object with the previous state of the cache in case we need to rollback in the onError
            return { cacheBeforeMutation, loadingToastId }
        },

        onSettled: async (_data, _error, income, context) => {
            if (context?.loadingToastId) {
                toast.dismiss(context.loadingToastId)
            }

            // invalidate the cache after income deletion, causes a re-fetch of the data from the database, more expensive
            //     await queryClient.invalidateQueries({
            //         queryKey: QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(income.userId),
            //     })

            // update local cache with the updated income
            queryClient.setQueryData(
                QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(income.userId),
                (oldIncomes: PrismaIncome[] | undefined) => {
                    if (!oldIncomes) return oldIncomes

                    return oldIncomes.filter((oldIncome) => oldIncome.id !== income.id)
                },
            )
        },

        onSuccess(_data, income, _context) {
            toast.success(`Successfully Deleted Income: ${income.description}`)
        },
    })
}
