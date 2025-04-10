import type { Transaction } from "@/types/forms/transaction"

type TransactionCardStatsProps = {
    transactions: Transaction[]
}

export default function TransactionCardStats(props: TransactionCardStatsProps) {
    const { transactions } = props

    return <div />
}
