import type { Transaction } from "./types"

export default function getTotalExpenses(transactions: Transaction[]) {
    return transactions.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0)
}
