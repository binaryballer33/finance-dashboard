import type { Income as PrismaIncome } from "@prisma/client"

import { IncomeSchema } from "@/types/forms/income"

import QUERY_KEYS from "@/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import updateIncome from "@/actions/income/mutations/update-income"

type Income = Omit<PrismaIncome, "createdAt" | "updatedAt">
type MutationContext = { cacheBeforeMutation?: PrismaIncome[]; loadingToastId: number | string }

export default function useUpdateIncomeMutation() {
    const queryClient = useQueryClient()

    return useMutation<null | PrismaIncome, Error, Income, MutationContext>({
        mutationFn: (income: Income) => updateIncome(income),

        mutationKey: QUERY_KEYS.UPDATE_INCOME,

        onError(error, income, context) {
            console.error(`Error Updating Income: ${error}`)
            toast.error(`Error Updating Income ${income.description}`)

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
            const loadingToastId = toast.loading(`Attempting To Update Income: ${income.description}`, {
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

            return { cacheBeforeMutation, loadingToastId }
        },

        onSettled: async (_data, _error, income, context) => {
            if (context?.loadingToastId) toast.dismiss(context.loadingToastId)

            // invalidate the cache after income update, causes a re-fetch of the data from the database, more expensive
            // await queryClient.invalidateQueries({
            //     queryKey: QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(income.userId),
            // })

            // update local cache with the updated income
            // optimistically update the cache to what it should be if there are no errors
            queryClient.setQueryData(
                QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(income.userId),
                (oldIncomes: PrismaIncome[]) =>
                    oldIncomes?.map((oldIncome) => (oldIncome.id === income.id ? income : oldIncome)),
            )
        },

        onSuccess(_data, income, _context) {
            toast.success(`Successfully Updated Income: ${income.description}`)
        },
    })
}
