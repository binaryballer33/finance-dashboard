import type { Income as PrismaIncome } from "@prisma/client"

import { IncomeSchema } from "@/types/forms/income"

import QUERY_KEYS from "@/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import createIncome from "@/actions/income/mutations/create-income"

type Income = Omit<PrismaIncome, "createdAt" | "id" | "updatedAt">
type MutationContext = { cacheBeforeMutation?: PrismaIncome[]; loadingToastId: number | string }

/*
 * Id gets created after item is added to the database,
 * need to invalidate the cache when creating the card because the id is not known until the card is created
 * and if the cache is not invalidated, if you try to edit or delete that card with its id,
 * you will get an error because the cache doesn't have the id because you didn't re-fetch the data from the database
 */
export default function useCreateIncomeMutation() {
    const queryClient = useQueryClient()

    return useMutation<null | PrismaIncome, Error, Income, MutationContext>({
        mutationFn: (income: Income) => createIncome(income),

        mutationKey: QUERY_KEYS.CREATE_INCOME,

        onError(error, income, context) {
            console.error(`Error Creating Income: ${error}`)
            toast.error(`Error Creating Income ${income.description}`)

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
            const loadingToastId = toast.loading(`Attempting To Create Income: ${income.description}`, {
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
            if (context?.loadingToastId) {
                toast.dismiss(context.loadingToastId)
            }

            // invalidate the cache after income creation, causes a re-fetch of the data from the database, more expensive but necessary for when the user creates a record in the table
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(income.userId),
            })
        },

        onSuccess(_data, income, _context) {
            toast.success(`Successfully Created Income: ${income.description} `)
        },
    })
}
