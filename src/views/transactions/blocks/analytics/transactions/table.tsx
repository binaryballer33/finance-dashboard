import { ArrowDownRight, ArrowUpRight, Edit2, Plus, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import type { Transaction } from "../utils/types"

type TransactionsTableProps = {
    deleteTransaction: (id: string) => void
    filteredTransactions: Transaction[]
    getCategoryIcon: (category: string, type: "expense" | "income") => React.ReactNode
    isLoading: boolean
    setIsAddDialogOpen: (open: boolean) => void
    startEditTransaction: (transaction: Transaction) => void
}

export default function TransactionsTable(props: TransactionsTableProps) {
    const {
        deleteTransaction,
        filteredTransactions,
        getCategoryIcon,
        isLoading,
        setIsAddDialogOpen,
        startEditTransaction,
    } = props

    return (
        <Card>
            <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>{filteredTransactions.length} transactions found</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px]">
                    {isLoading ? (
                        <div className="flex h-full items-center justify-center">
                            <p>Loading transactions...</p>
                        </div>
                    ) : filteredTransactions.length > 0 ? (
                        <div className="space-y-4">
                            {filteredTransactions.map((transaction) => (
                                <div
                                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                    key={transaction.id}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`rounded-full p-2 ${
                                                transaction.type === "income"
                                                    ? "bg-green-100 dark:bg-green-900"
                                                    : "bg-red-100 dark:bg-red-900"
                                            }`}
                                        >
                                            {transaction.type === "income" ? (
                                                <ArrowUpRight className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <ArrowDownRight className="h-5 w-5 text-red-500" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{transaction.description}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Badge className="flex items-center gap-1" variant="outline">
                                                    {getCategoryIcon(transaction.category, transaction.type)}
                                                    {transaction.category}
                                                </Badge>
                                                <span>{new Date(transaction.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`font-bold ${
                                                transaction.type === "income" ? "text-green-500" : "text-red-500"
                                            }`}
                                        >
                                            {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                                        </span>
                                        <div className="flex gap-1">
                                            <Button
                                                aria-label={`Edit ${transaction.description}`}
                                                onClick={() => startEditTransaction(transaction)}
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                aria-label={`Delete ${transaction.description}`}
                                                onClick={() => deleteTransaction(transaction.id)}
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-[300px] flex-col items-center justify-center text-center">
                            <p className="mb-2 text-muted-foreground">No transactions found</p>
                            <Button onClick={() => setIsAddDialogOpen(true)} variant="outline">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Your First Transaction
                            </Button>
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
