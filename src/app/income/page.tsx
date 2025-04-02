import type { Metadata } from "next/"

import { appMetadata } from "@/lib/config"

import IncomeView from "@/views/income/income-view"

export const metadata: Metadata = appMetadata.income

export default async function IncomePage() {
    return <IncomeView />
}
