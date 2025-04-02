import type { Metadata } from "next/"

import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import IncomeView from "@/views/income/income-view"

import prefetchIncomePageDataDehydrateState from "./prefetch-income-page-data"

export const metadata: Metadata = appMetadata.income

export default async function IncomePage() {
    const prefetchResult = await prefetchIncomePageDataDehydrateState()

    if (!prefetchResult) return null

    const { dehydratedState } = prefetchResult

    return (
        <HydrationBoundary state={dehydratedState}>
            <IncomeView />
        </HydrationBoundary>
    )
}
