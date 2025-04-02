import type { Metadata } from "next/"

import { appMetadata } from "@/lib/config"

import ExpensesView from "@/views/expenses/expenses-view"

export const metadata: Metadata = appMetadata.expenses

export default async function ExpensesPage() {
    return <ExpensesView />
}
