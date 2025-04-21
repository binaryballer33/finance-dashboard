import type { Metadata } from "next/"

import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import SavingsView from "@/views/savings/savings-view"

import prefetchSavingsPageDataDehydrateState from "./prefetch-savings-page-data"

export const metadata: Metadata = appMetadata.savings

export default async function SavingsPage() {
    const prefetchResult = await prefetchSavingsPageDataDehydrateState()
    if (!prefetchResult) return null

    const { dehydratedState, user } = prefetchResult

    return (
        <HydrationBoundary state={dehydratedState}>
            <SavingsView userId={user.id} />
        </HydrationBoundary>
    )
}
