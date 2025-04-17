import type { Metadata } from "next/"

import { redirect } from "next/navigation"

import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import getCurrentUser from "@/actions/user/get-current-user"

import routes from "@/routes/routes"

import TransactionsView from "@/views/transactions/transactions-view"

import prefetchTransactionsPageDataDehydrateState from "./prefetch-transactions-page-data"

export const metadata: Metadata = appMetadata.transactions

export default async function TransactionsPage() {
    const prefetchResult = await prefetchTransactionsPageDataDehydrateState()
    const user = await getCurrentUser()
    if (!user) redirect(routes.auth.login)

    if (!prefetchResult) return null

    const { dehydratedState } = prefetchResult

    return (
        <HydrationBoundary state={dehydratedState}>
            <TransactionsView userId={user.id} />
        </HydrationBoundary>
    )
}
