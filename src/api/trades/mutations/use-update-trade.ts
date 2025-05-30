import type { Trade as PrismaTrade } from "@prisma/client"

import { TradeSchema } from "@/types/forms/trade"

import QUERY_KEYS from "@/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import updateTrade from "@/actions/trades/mutations/update-trade"

type Trade = Omit<PrismaTrade, "createdAt" | "updatedAt">
type MutationContext = { cacheBeforeMutation?: PrismaTrade[]; loadingToastId: number | string }

export default function useUpdateTradeMutation() {
    const queryClient = useQueryClient()

    return useMutation<null | PrismaTrade, Error, Trade, MutationContext>({
        mutationFn: (trade: Trade) => updateTrade(trade),

        mutationKey: QUERY_KEYS.UPDATE_TRADE,

        onError(error, trade, context) {
            console.error(`Error Updating Trade: ${error}`)
            toast.error(`Error Updating Trade ${trade.ticker}`)

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

            // show a loading toast while the trade is being updated, this will be dismissed when the trade is updated
            const loadingToastId = toast.loading(`Attempting To Update Trade: ${trade.ticker}`, {
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
            if (context?.loadingToastId) toast.dismiss(context.loadingToastId)

            // invalidate the cache after trade update, causes a re-fetch of the data from the database, more expensive
            // await queryClient.invalidateQueries({
            //     queryKey: QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(trade.userId),
            // })

            // optimistically update the cache to what it should be if there are no errors
            queryClient.setQueryData(QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(trade.userId), (oldTrades: PrismaTrade[]) =>
                oldTrades?.map((oldTrade) => (oldTrade.id === trade.id ? trade : oldTrade)),
            )
        },

        onSuccess(_data, trade, _context) {
            toast.success(`Successfully Updated Trade: ${trade.ticker}`)
        },
    })
}
