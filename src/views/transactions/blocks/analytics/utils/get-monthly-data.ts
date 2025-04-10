import type { Transaction } from "./types"

export default function getMonthlyData(transactions: Transaction[]) {
    const monthlyData = new Map<string, { expense: number; income: number }>()

    // Initialize with last 6 months
    const today = new Date()
    for (let i = 5; i >= 0; i -= 1) {
        const month = new Date(today.getFullYear(), today.getMonth() - i, 1)
        const monthKey = `${month.toLocaleString("default", { month: "short" })} ${month.getFullYear()}`
        monthlyData.set(monthKey, { expense: 0, income: 0 })
    }

    // Fill with transaction data
    transactions.forEach((t) => {
        const date = new Date(t.date)
        const monthKey = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`

        if (monthlyData.has(monthKey)) {
            const current = monthlyData.get(monthKey)!
            if (t.type === "income") {
                current.income += t.amount
            } else {
                current.expense += t.amount
            }
            monthlyData.set(monthKey, current)
        }
    })

    return Array.from(monthlyData.entries()).map(([name, data]) => ({
        balance: data.income - data.expense,
        expenses: data.expense,
        income: data.income,
        name,
    }))
}
