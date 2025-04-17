import type { Transaction } from "@prisma/client"

export default function getCategoryData(transactions: Transaction[]) {
    const categoryMap = new Map<string, number>()

    transactions
        // Filter for expense transactions or transactions without a type field
        // This handles the case where we're using the Transaction model which doesn't have a type field
        .forEach((t) => {
            const current = categoryMap.get(t.category) || 0
            categoryMap.set(t.category, current + t.amount)
        })

    return Array.from(categoryMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value) // Sort by value descending
}
