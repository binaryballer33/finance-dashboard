import type { Transaction } from "./types"

export default function getTotalIncome(transactions: Transaction[]) {
    return transactions.filter((t) => t.type === "income").reduce((acc, t) => acc + t.amount, 0)
}
