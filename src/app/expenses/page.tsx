import type { Metadata } from "next/"

import { redirect } from "next/navigation"

import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import getCurrentUser from "@/actions/user/get-current-user"

import routes from "@/routes/routes"

import ExpensesView from "@/views/expenses/expenses-view"

import prefetchExpensesPageDataDehydrateState from "./prefetch-expenses-page-data"

export const metadata: Metadata = appMetadata.expenses

export default async function ExpensesPage() {
    const prefetchResult = await prefetchExpensesPageDataDehydrateState()
    const user = await getCurrentUser()

    if (!user) redirect(routes.auth.login)

    if (!prefetchResult) return null

    const { dehydratedState } = prefetchResult

    return (
        <HydrationBoundary state={dehydratedState}>
            <ExpensesView userId={user.id} />
        </HydrationBoundary>
    )
}
