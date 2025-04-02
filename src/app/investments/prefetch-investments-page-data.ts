"use server"

import type { Trade } from "@prisma/client"

import createQueryClient from "@/api/query-client-server-component"
import QUERY_KEYS from "@/api/query-keys"
import { type DehydratedState } from "@tanstack/react-query"
import { dehydrate } from "@tanstack/react-query"

import getTradesByUserId from "@/actions/trades/queries/get-trades-by-userId"
import getCurrentUser from "@/actions/user/get-current-user"

type PrefetchInvestmentsPageDataDehydrateStateResponse = {
    dehydratedState: DehydratedState
    trades: Trade[]
}

/*
 * Prefetch data for all tabs on server component, so that the data is available immediately no hydration required
 * This is important for SEO and performance, if you want to see the speed difference, comment out the prefetch
 * or comment out the HydrationBoundary or the await keywords on each prefetch
 */
export default async function prefetchInvestmentsPageDataDehydrateState(): Promise<null | PrefetchInvestmentsPageDataDehydrateStateResponse> {
    // get the react query client
    const queryClient = await createQueryClient() // need to create a new queryClient for each request for server components

    // get the currently authenticated user
    const user = await getCurrentUser()
    if (!user) return null

    // prefetch all trades by user id and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getTradesByUserId(user.id, 0, 100)) ?? [],
        queryKey: QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(user.id),
    })

    // get the trades from the cache and return them in case a component needs them
    const trades = queryClient.getQueryData<Trade[]>(QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(user.id))!

    // Important: Dehydrate the client AFTER prefetching so that the data is available immediately
    const dehydratedState = dehydrate(queryClient)

    return {
        dehydratedState,
        trades,
    }
}
