import prefetchHomePageDataDehydrateState from "@/app/prefetch-home-page-data"
import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import getCurrentUser from "@/actions/user/get-current-user"

import HomeView from "@/views/home/home-view"

export const metadata = appMetadata.homePage

export default async function HomePage() {
    const prefetchResult = await prefetchHomePageDataDehydrateState()
    const user = await getCurrentUser()

    if (!prefetchResult || !user) return null

    const { dehydratedState } = prefetchResult

    return (
        <HydrationBoundary state={dehydratedState}>
            <HomeView user={user} />
        </HydrationBoundary>
    )
}
