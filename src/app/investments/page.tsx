import type { Metadata } from "next/"

import { appMetadata } from "@/lib/config"

import InvestmentsView from "@/views/investments/investments-view"

export const metadata: Metadata = appMetadata.investments

export default async function InvestmentsPage() {
    return <InvestmentsView />
}
