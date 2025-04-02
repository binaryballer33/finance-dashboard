import type { Metadata } from "next/"

import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import TransactionsView from "@/views/transactions/transactions-view"

import prefetchTransactionsPageDataDehydrateState from "./prefetch-transactions-page-data"

export const metadata: Metadata = appMetadata.transactions

export default async function TransactionsPage() {
    const prefetchResult = await prefetchTransactionsPageDataDehydrateState()
    if (!prefetchResult) return null

    const { dehydratedState } = prefetchResult

    return (
        <HydrationBoundary state={dehydratedState}>
            <TransactionsView />
        </HydrationBoundary>
    )
}
