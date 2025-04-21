import type { Metadata } from "next/"

import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import ExpensesView from "@/views/expenses/expenses-view"

import prefetchExpensesPageDataDehydrateState from "./prefetch-expenses-page-data"

export const metadata: Metadata = appMetadata.expenses

export default async function ExpensesPage() {
    const prefetchResult = await prefetchExpensesPageDataDehydrateState()

    if (!prefetchResult) return null

    const { dehydratedState, user } = prefetchResult

    return (
        <HydrationBoundary state={dehydratedState}>
            <ExpensesView userId={user.id} />
        </HydrationBoundary>
    )
}
