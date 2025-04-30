import type { Trade as PrismaTrade } from "@prisma/client"

import { TradeSchema } from "@/types/forms/trade"

import QUERY_KEYS from "@/api/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import deleteTrade from "@/actions/trades/mutations/delete-trade"

type Trade = Omit<PrismaTrade, "createdAt" | "updatedAt">
type MutationContext = { cacheBeforeMutation?: PrismaTrade[]; loadingToastId: number | string }

/*
 * Id gets created after item is added to the database,
 * need to invalidate the cache when creating the card because the id is not known until the card is created
 * and if the cache is not invalidated, if you try to edit or delete that card with its id,
 * you will get an error because the cache doesn't have the id because you didn't re-fetch the data from the database
 */
export default function useDeleteTradeMutation() {
    const queryClient = useQueryClient()

    return useMutation<null | PrismaTrade, Error, Trade, MutationContext>({
        mutationFn: (trade: Trade) => deleteTrade(trade),

        mutationKey: QUERY_KEYS.DELETE_TRADE,

        onError(error, trade, context) {
            console.error(`Error Deleting Trade: ${error}`)
            toast.error(`Error Deleting Trade ${trade.ticker}`)

            // if there is an error with the db call after doing the optimistic update, rollback the update using the cache
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

            // show a loading toast while the trade is being deleted, this will be dismissed when the trade is deleted
            const loadingToastId = toast.loading(`Attempting To Delete Trade: ${trade.ticker}`, {
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

            // return a context object with the previous state of the cache in case we need to rollback in the onError
            return { cacheBeforeMutation, loadingToastId }
        },

        onSettled: async (_data, _error, trade, context) => {
            if (context?.loadingToastId) {
                toast.dismiss(context.loadingToastId)
            }

            // invalidate the cache after trade deletion, causes a re-fetch of the data from the database, more expensive
            //     await queryClient.invalidateQueries({
            //         queryKey: QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(trade.userId),
            //     })

            // update local cache with the updated trade
            queryClient.setQueryData(
                QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(trade.userId),
                (oldTrades: PrismaTrade[] | undefined) => {
                    if (!oldTrades) return oldTrades

                    return oldTrades.filter((oldTrade) => oldTrade.id !== trade.id)
                },
            )
        },

        onSuccess(_data, trade, _context) {
            toast.success(`Successfully Deleted Trade: ${trade.ticker}`)
        },
    })
}
