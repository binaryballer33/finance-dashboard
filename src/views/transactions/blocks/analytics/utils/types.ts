export type Transaction = {
    amount: number
    category: string
    date: string
    description: string
    id: string
    type: "expense" | "income"
}
