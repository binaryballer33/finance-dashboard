import prefetchHomePageDataDehydrateState from "@/app/prefetch-home-page-data"
import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import HomeView from "@/views/home/home-view"

export const metadata = appMetadata.homePage

// TODO: improve performance later with tools like chrome dev tool lighthouse, use unlighthouse and chrome extension webvitals
export default async function HomePage() {
    const { dehydratedState } = await prefetchHomePageDataDehydrateState()

    return (
        <HydrationBoundary state={dehydratedState}>
            <HomeView />
        </HydrationBoundary>
    )
}
