import type { Metadata } from "next/"

import { redirect } from "next/navigation"

import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import getCurrentUser from "@/actions/user/get-current-user"

import routes from "@/routes/routes"

import IncomeView from "@/views/income/income-view"

import prefetchIncomePageDataDehydrateState from "./prefetch-income-page-data"

export const metadata: Metadata = appMetadata.income

export default async function IncomePage() {
    const prefetchResult = await prefetchIncomePageDataDehydrateState()
    const user = await getCurrentUser()
    if (!user) redirect(routes.auth.login)

    if (!prefetchResult) return null

    const { dehydratedState } = prefetchResult

    return (
        <HydrationBoundary state={dehydratedState}>
            <IncomeView userId={user.id} />
        </HydrationBoundary>
    )
}
