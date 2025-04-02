"use server"

import type { Income } from "@prisma/client"
import type { DehydratedState } from "@tanstack/react-query"

import createQueryClient from "@/api/query-client-server-component"
import QUERY_KEYS from "@/api/query-keys"
import { dehydrate } from "@tanstack/react-query"

import { auth } from "@/auth/auth"

import getIncomeByUserId from "@/actions/income/queries/get-income-by-userId"

type PrefetchIncomePageDataDehydrateStateResponse = {
    dehydratedState: DehydratedState
    income: Income[]
}

/*
 * Prefetch data for all tabs on server component, so that the data is available immediately no hydration required
 * This is important for SEO and performance, if you want to see the speed difference, comment out the prefetch
 * or comment out the HydrationBoundary or the await keywords on each prefetch
 */
export default async function prefetchIncomePageDataDehydrateState(): Promise<null | PrefetchIncomePageDataDehydrateStateResponse> {
    // get the react query client
    const queryClient = await createQueryClient() // need to create a new queryClient for each request for server components
    const dehydratedState = dehydrate(queryClient)

    // get the currently authenticated user
    const session = await auth()
    if (!session?.user?.id) {
        console.error("No User Authenticated When Prefetching Data")
        return null
    }
    const userId = session.user.id

    // prefetch all trades by user id and store the data in the cache
    await queryClient.prefetchQuery({
        queryFn: async () => (await getIncomeByUserId(userId)) ?? [],
        queryKey: QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(userId),
    })

    // get the trades from the cache and return them in case a component needs them
    const income = queryClient.getQueryData<Income[]>(QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(userId))!

    return {
        // return the dehydrated state of the queryClient and the income from the cache
        dehydratedState,
        income,
    }
}
