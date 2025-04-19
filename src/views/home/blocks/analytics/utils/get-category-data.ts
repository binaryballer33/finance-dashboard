import type { Expense } from "@prisma/client"

export default function getCategoryData(expenses: Expense[]) {
    const categoryMap = new Map<string, number>()

    expenses.forEach((t) => {
        const current = categoryMap.get(t.category) || 0
        categoryMap.set(t.category, current + t.amount)
    })

    return Array.from(categoryMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value) // Sort by value descending
}
