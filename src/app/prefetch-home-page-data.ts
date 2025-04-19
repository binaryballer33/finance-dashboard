"use server"

import type { Expense, Income, Trade } from "@prisma/client"
import type { DehydratedState } from "@tanstack/react-query"

import createQueryClient from "@/api/query-client-server-component"
import QUERY_KEYS from "@/api/query-keys"
import { dehydrate } from "@tanstack/react-query"

import getExpensesByUserId from "@/actions/expenses/queries/get-expenses-by-userId"
import getIncomeByUserId from "@/actions/income/queries/get-income-by-userId"
import getTradesByUserId from "@/actions/trades/queries/get-trades-by-userId"
import getCurrentUser from "@/actions/user/get-current-user"

type InfiniteQueryData<T> = {
    pageParams: number[]
    pages: T[][]
}

type PrefetchHomePageDataDehydrateStateResponse = {
    dehydratedState: DehydratedState
    expenses: Expense[]
    incomes: Income[]
    trades: Trade[]
}

/*
 * Prefetch data for all tabs on server component, so that the data is available immediately no hydration required
 * This is important for SEO and performance, if you want to see the speed difference, comment out the prefetch
 * or comment out the HydrationBoundary or the await keywords on each prefetch
 */
export default async function prefetchHomePageDataDehydrateState(): Promise<null | PrefetchHomePageDataDehydrateStateResponse> {
    // get the react query client
    const queryClient = await createQueryClient() // need to create a new queryClient for each request for server components

    // get the currently authenticated user
    const user = await getCurrentUser()
    if (!user) return null

    // prefetch all expenses using infinite query since there are alot of expenses and store the data in the cache
    await queryClient.prefetchInfiniteQuery({
        initialPageParam: 0,

        queryFn: async ({ pageParam = 0 }) => {
            const expenses = (await getExpensesByUserId(user.id, pageParam, 100)) ?? []
            return expenses
        },

        queryKey: QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(user.id),
    })

    // get the expenses from the cache and return them in case a component needs them
    const expenses = queryClient
        .getQueryData<InfiniteQueryData<Expense>>(QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(user.id))
        ?.pages.flatMap((page) => page)!

    // prefetch all incomes by user id and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getIncomeByUserId(user.id)) ?? [],
        queryKey: QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(user.id),
    })

    // get the incomes from the cache and return them in case a component needs them
    const incomes = queryClient.getQueryData<Income[]>(QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(user.id))!

    // prefetch all trades by user id and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getTradesByUserId(user.id)) ?? [],
        queryKey: QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(user.id),
    })

    // get the trades from the cache and return them in case a component needs them
    const trades = queryClient.getQueryData<Trade[]>(QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(user.id))!

    // Important: Dehydrate the client AFTER prefetching so that the data is available immediately
    const dehydratedState = dehydrate(queryClient)

    return {
        // return the dehydrated state of the queryClient and the transactions from the cache
        dehydratedState,
        expenses,
        incomes,
        trades,
    }
}
