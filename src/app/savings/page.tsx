import type { Metadata } from "next/"

import { appMetadata } from "@/lib/config"

import SavingsView from "@/views/savings/savings-view"

export const metadata: Metadata = appMetadata.savings

export default async function SavingsPage() {
    return <SavingsView />
}
