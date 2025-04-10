import type { Transaction } from "./types"

export default function getBalance(transactions: Transaction[]) {
    return transactions.reduce((acc, transaction) => {
        if (transaction.type === "income") {
            return acc + transaction.amount
        }
        return acc - transaction.amount
    }, 0)
}
