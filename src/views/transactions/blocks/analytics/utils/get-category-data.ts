import type { Transaction } from "./types"

export default function getCategoryData(transactions: Transaction[]) {
    const categoryMap = new Map<string, number>()

    transactions
        .filter((t) => t.type === "expense")
        .forEach((t) => {
            const current = categoryMap.get(t.category) || 0
            categoryMap.set(t.category, current + t.amount)
        })

    return Array.from(categoryMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value) // Sort by value descending
}
