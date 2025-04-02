import type { Metadata } from "next/"

import { appMetadata } from "@/lib/config"

import TransactionsView from "@/views/transactions/transactions-view"

export const metadata: Metadata = appMetadata.transactions

export default async function TransactionsPage() {
    return <TransactionsView />
}
