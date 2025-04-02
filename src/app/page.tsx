import prefetchHomePageDataDehydrateState from "@/app/prefetch-home-page-data"
import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import HomeView from "@/views/home/home-view"

export const metadata = appMetadata.homePage

export default async function HomePage() {
    const prefetchResult = await prefetchHomePageDataDehydrateState()

    if (!prefetchResult) return null

    const { dehydratedState } = prefetchResult

    return (
        <HydrationBoundary state={dehydratedState}>
            <HomeView />
        </HydrationBoundary>
    )
}
