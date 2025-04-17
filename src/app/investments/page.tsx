import type { Metadata } from "next/"

import { redirect } from "next/navigation"

import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import getCurrentUser from "@/actions/user/get-current-user"

import routes from "@/routes/routes"

import InvestmentsView from "@/views/investments/investments-view"

import prefetchInvestmentsPageDataDehydrateState from "./prefetch-investments-page-data"

export const metadata: Metadata = appMetadata.investments

export default async function InvestmentsPage() {
    const prefetchResult = await prefetchInvestmentsPageDataDehydrateState()
    const user = await getCurrentUser()
    if (!user) redirect(routes.auth.login)
    if (!prefetchResult) return null

    const { dehydratedState } = prefetchResult

    return (
        <HydrationBoundary state={dehydratedState}>
            <InvestmentsView userId={user.id} />
        </HydrationBoundary>
    )
}
