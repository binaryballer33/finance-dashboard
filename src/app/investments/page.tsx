import type { Metadata } from "next/"

import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import InvestmentsView from "@/views/investments/investments-view"

import prefetchInvestmentsPageDataDehydrateState from "./prefetch-investments-page-data"

export const metadata: Metadata = appMetadata.investments

export default async function InvestmentsPage() {
    const prefetchResult = await prefetchInvestmentsPageDataDehydrateState()
    if (!prefetchResult) return null

    const { dehydratedState, user } = prefetchResult

    return (
        <HydrationBoundary state={dehydratedState}>
            <InvestmentsView userId={user.id} />
        </HydrationBoundary>
    )
}
