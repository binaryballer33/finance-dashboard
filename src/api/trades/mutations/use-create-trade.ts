import type { Trade as PrismaTrade } from "@prisma/client"

import { TradeSchema } from "@/types/forms/trade"

import QUERY_KEYS from "@/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import createTrade from "@/actions/trades/mutations/create-trade"

type Trade = Omit<PrismaTrade, "createdAt" | "id" | "updatedAt">
type MutationContext = { cacheBeforeMutation?: PrismaTrade[]; loadingToastId: number | string }

/*
 * Id gets created after item is added to the database,
 * need to invalidate the cache when creating the record because the id is not known until the record is created
 * and if the cache is not invalidated, if you try to edit or delete that record with its id,
 * you will get an error because the cache doesn't have the id because you didn't re-fetch the data from the database
 */
export default function useCreateTradeMutation() {
    const queryClient = useQueryClient()

    return useMutation<null | PrismaTrade, Error, Trade, MutationContext>({
        mutationFn: (trade: Trade) => createTrade(trade),

        mutationKey: QUERY_KEYS.CREATE_TRADE,

        onError(error, trade, context) {
            console.error(`Error Creating Trade: ${error}`)
            toast.error(`Error Creating Trade ${trade.ticker}`)

            if (context?.cacheBeforeMutation) {
                queryClient.setQueryData(
                    QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(trade.userId),
                    context.cacheBeforeMutation,
                )
            }
        },

        onMutate: async (trade) => {
            // if there's a validation error, the mutation will not be called and the onError will be called
            TradeSchema.parse(trade)

            // show a loading toast while the trade is being created, this will be dismissed when the trade is created
            const loadingToastId = toast.loading(`Attempting To Create Trade: ${trade.ticker}`, {
                duration: 500,
            })

            // cancel any outgoing re-fetches (so they don't overwrite our optimistic update), this is asynchronous
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(trade.userId),
            })

            // get the previous state of the cache before modifying the cache, for rollback on error purposes
            const cacheBeforeMutation = queryClient.getQueryData<PrismaTrade[]>(
                QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(trade.userId),
            )

            return { cacheBeforeMutation, loadingToastId }
        },

        onSettled: async (_data, _error, trade, context) => {
            if (context?.loadingToastId) {
                toast.dismiss(context.loadingToastId)
            }

            // invalidate the cache after trade creation, causes a re-fetch of the data from the database, more expensive but necessary for when the user creates a record in the table
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(trade.userId),
            })
        },

        onSuccess(_data, trade, _context) {
            toast.success(`Successfully Created Trade: ${trade.ticker} `)
        },
    })
}
