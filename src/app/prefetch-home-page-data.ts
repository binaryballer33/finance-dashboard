"use server"

import type { YuGiOhCard } from "@/types/yu-gi-oh/yu-gi-oh"
import type { Trade } from "@prisma/client"

import createQueryClient from "@/api/query-client-server-component"
import QUERY_KEYS from "@/api/query-keys"
import { dehydrate } from "@tanstack/react-query"

import getTrades from "@/actions/trades/queries/get-trades"
import getYugiohCards from "@/actions/yu-gi-oh/queries/get-yu-gi-oh-cards"

type InfiniteQueryData<T> = {
    pageParams: number[]
    pages: T[][]
}

/*
 * Prefetch data for all tabs on server component, so that the data is available immediately no hydration required
 * This is important for SEO and performance, if you want to see the speed difference, comment out the prefetch
 * or comment out the HydrationBoundary or the await keywords on each prefetch
 */
export default async function prefetchHomePageDataDehydrateState() {
    const queryClient = await createQueryClient() // need to create a new queryClient for each request for server components

    // prefetch all yu-gi-oh cards using infinite query since there are alot of cards and store the data in the cache
    await queryClient.prefetchInfiniteQuery({
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
            const yugiohCards = await getYugiohCards(pageParam, 100)
            if (!yugiohCards) throw new Error("Failed to fetch Yu-Gi-Oh cards")
            return yugiohCards
        },
        queryKey: QUERY_KEYS.YU_GI_OH_CARDS,
    })

    // prefetch all trades and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getTrades()) ?? [],
        queryKey: QUERY_KEYS.GET_ALL_TRADES,
    })

    // get the yu-gi-oh cards from the cache and return them in case a component needs them
    const yugiohCards = queryClient
        .getQueryData<InfiniteQueryData<YuGiOhCard>>(QUERY_KEYS.YU_GI_OH_CARDS)
        ?.pages.flatMap((page) => page)

    // get the trades from the cache and return them in case a component needs them
    const trades = queryClient.getQueryData<Trade[]>(QUERY_KEYS.GET_ALL_TRADES)

    return {
        // return the dehydrated state of the queryClient and the yu-gi-oh cards from the cache
        dehydratedState: dehydrate(queryClient),
        trades,
        yugiohCards,
    }
}
