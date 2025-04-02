"use server"

import type { Transaction } from "@prisma/client"

import createQueryClient from "@/api/query-client-server-component"
import QUERY_KEYS from "@/api/query-keys"
import { type DehydratedState } from "@tanstack/react-query"
import { dehydrate } from "@tanstack/react-query"

import getTransactionsByUserId from "@/actions/transactions/queries/get-transactions-by-userId"
import getCurrentUser from "@/actions/user/get-current-user"

type InfiniteQueryData<T> = {
    pageParams: number[]
    pages: T[][]
}

type PrefetchTransactionsPageDataDehydrateStateResponse = {
    dehydratedState: DehydratedState
    transactions: Transaction[]
}

/*
 * Prefetch data for all tabs on server component, so that the data is available immediately no hydration required
 * This is important for SEO and performance, if you want to see the speed difference, comment out the prefetch
 * or comment out the HydrationBoundary or the await keywords on each prefetch
 */
export default async function prefetchTransactionsPageDataDehydrateState(): Promise<null | PrefetchTransactionsPageDataDehydrateStateResponse> {
    // get the react query client
    const queryClient = await createQueryClient() // need to create a new queryClient for each request for server components

    const user = await getCurrentUser()
    if (!user) return null

    // prefetch all transactions using infinite query since there are alot of transactions and store the data in the cache
    await queryClient.prefetchInfiniteQuery({
        initialPageParam: 0,

        queryFn: async ({ pageParam = 0 }) => {
            const transactions = await getTransactionsByUserId(user.id, pageParam, 100)
            if (!transactions) throw new Error("Failed To Fetch Transactions")
            return transactions
        },

        queryKey: QUERY_KEYS.GET_ALL_TRANSACTIONS_BY_USER_ID(user.id),
    })

    // get the transactions from the cache and return them in case a component needs them
    const transactions = queryClient
        .getQueryData<InfiniteQueryData<Transaction>>(QUERY_KEYS.GET_ALL_TRANSACTIONS_BY_USER_ID(user.id))
        ?.pages.flatMap((page) => page)!

    // Important: Dehydrate the client AFTER prefetching so that the data is available immediately
    const dehydratedState = dehydrate(queryClient)

    return {
        dehydratedState,
        transactions,
    }
}
