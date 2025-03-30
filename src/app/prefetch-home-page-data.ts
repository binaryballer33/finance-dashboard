"use server"

import type { Trade, Transaction } from "@prisma/client"

import createQueryClient from "@/api/query-client-server-component"
import QUERY_KEYS from "@/api/query-keys"
import { dehydrate } from "@tanstack/react-query"

import getTrades from "@/actions/trades/queries/get-trades"
import getTransactions from "@/actions/transactions/queries/get-transactions"

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

    // prefetch all transactions using infinite query since there are alot of transactions and store the data in the cache
    await queryClient.prefetchInfiniteQuery({
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
            const transactions = await getTransactions(pageParam, 100)
            if (!transactions) throw new Error("Failed To Fetch Transactions")
            return transactions
        },
        queryKey: QUERY_KEYS.GET_ALL_TRANSACTIONS,
    })

    // prefetch all trades and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getTrades()) ?? [],
        queryKey: QUERY_KEYS.GET_ALL_TRADES,
    })

    // get the transactions from the cache and return them in case a component needs them
    const transactions = queryClient
        .getQueryData<InfiniteQueryData<Transaction>>(QUERY_KEYS.GET_ALL_TRANSACTIONS)
        ?.pages.flatMap((page) => page)

    // get the trades from the cache and return them in case a component needs them
    const trades = queryClient.getQueryData<Trade[]>(QUERY_KEYS.GET_ALL_TRADES)

    return {
        // return the dehydrated state of the queryClient and the transactions from the cache
        dehydratedState: dehydrate(queryClient),
        trades,
        transactions,
    }
}
