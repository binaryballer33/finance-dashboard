"use server"

import type { Expense } from "@prisma/client"

import createQueryClient from "@/api/query-client-server-component"
import QUERY_KEYS from "@/api/query-keys"
import { type DehydratedState } from "@tanstack/react-query"
import { dehydrate } from "@tanstack/react-query"

import getExpensesByUserId from "@/actions/expenses/queries/get-expenses-by-userId"
import getCurrentUser from "@/actions/user/get-current-user"

type PrefetchExpensesPageDataDehydrateStateResponse = {
    dehydratedState: DehydratedState
    expenses: Expense[]
}

/*
 * Prefetch data for all tabs on server component, so that the data is available immediately no hydration required
 * This is important for SEO and performance, if you want to see the speed difference, comment out the prefetch
 * or comment out the HydrationBoundary or the await keywords on each prefetch
 */
export default async function prefetchExpensesPageDataDehydrateState(): Promise<null | PrefetchExpensesPageDataDehydrateStateResponse> {
    // get the react query client
    const queryClient = await createQueryClient() // need to create a new queryClient for each request for server components

    const user = await getCurrentUser()
    if (!user) return null

    // prefetch all expenses by user id and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getExpensesByUserId(user.id, 0, 100)) ?? [],
        queryKey: QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(user.id),
    })

    // get the expenses from the cache and return them in case a component needs them
    const expenses = queryClient.getQueryData<Expense[]>(QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(user.id))!

    // Important: Dehydrate the client AFTER prefetching so that the data is available immediately
    const dehydratedState = dehydrate(queryClient)

    return {
        dehydratedState,
        expenses,
    }
}
