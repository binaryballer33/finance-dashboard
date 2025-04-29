import type { Expense } from "@prisma/client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import formatAmount from "../utils/format-amount"

type BudgetHealthProps = {
    expenses: Expense[]
    totalExpenses: number
    totalIncome: number
}

export default function BudgetHealth(props: BudgetHealthProps) {
    const { expenses, totalExpenses, totalIncome } = props

    const [budgetAmount, setBudgetAmount] = useState(3000)
    const budgetAmountOptions = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Budget Health</CardTitle>
                <CardDescription>How Well Are You Managing Your Finances?</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="mb-4 flex items-center justify-around gap-2 max-sm:flex-col">
                    <div className="flex items-center justify-center gap-2">
                        <p className="text-nowrap">Budget Amount</p>

                        <Select
                            onValueChange={(value) => setBudgetAmount(Number(value))}
                            value={budgetAmount.toString()}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {budgetAmountOptions.map((amount) => (
                                    <SelectItem key={amount} value={amount.toString()}>
                                        {formatAmount(amount)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <p className="text-nowrap">Budget Remaining: ${formatAmount(budgetAmount - totalExpenses)}</p>
                </div>

                {expenses.length > 0 ? (
                    <div className="space-y-6">
                        <div>
                            <div className="mb-1 flex justify-between">
                                <span className="text-sm font-medium">Savings Rate</span>
                                <span className="text-sm font-medium">
                                    {totalIncome > 0
                                        ? `${(((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(0)}%`
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-muted">
                                <div
                                    className="h-2.5 rounded-full bg-green-500"
                                    style={{
                                        width: `${
                                            totalIncome > 0
                                                ? Math.min(((totalIncome - totalExpenses) / totalIncome) * 100, 100)
                                                : 0
                                        }%`,
                                    }}
                                />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">Aim For At Least 20% Savings Rate</p>
                        </div>

                        <div>
                            <div className="mb-1 flex justify-between">
                                <span className="text-sm font-medium">Expense To Income Ratio</span>
                                <span className="text-sm font-medium">
                                    {totalIncome > 0 ? `${((totalExpenses / totalIncome) * 100).toFixed(0)}%` : "N/A"}
                                </span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-muted">
                                <div
                                    className={`h-2.5 rounded-full ${getExpenseRatioColor(totalIncome, totalExpenses)}`}
                                    style={{
                                        width: `${
                                            totalIncome > 0 ? Math.min((totalExpenses / totalIncome) * 100, 100) : 0
                                        }%`,
                                    }}
                                />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">Keep Expenses Below 70% Of Income</p>
                        </div>

                        <div>
                            <div className="mb-1 flex justify-between">
                                <span className="text-sm font-medium">Essential VS. Non-essential Spending</span>
                                <span className="text-sm font-medium">
                                    {totalExpenses > 0
                                        ? `${calculateEssentialSpendingTotal(expenses, totalExpenses).toFixed(
                                              0,
                                          )}% Essential`
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="flex h-2.5 w-full rounded-full bg-muted">
                                <div
                                    className="h-2.5 rounded-l-full bg-blue-500"
                                    style={{
                                        width: `${
                                            totalExpenses > 0
                                                ? calculateEssentialSpendingTotal(expenses, totalExpenses)
                                                : 0
                                        }%`,
                                    }}
                                />
                                <div
                                    className="h-2.5 rounded-r-full bg-purple-500"
                                    style={{
                                        width: `${
                                            totalExpenses > 0
                                                ? 100 - calculateEssentialSpendingTotal(expenses, totalExpenses)
                                                : 0
                                        }%`,
                                    }}
                                />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Balance Between Essential (Blue) And Non-essential (Purple) Spending
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground">Add Transactions To See Your Budget Health</p>
                )}
            </CardContent>
        </Card>
    )
}

function filterEssentialCategories(expenses: Expense[]) {
    return expenses.filter((t) => {
        switch (t.category) {
            case "Food":
            case "Housing":
            case "Transportation":
            case "Utilities":
            case "Health":
            case "Education":
            case "Tuition":
            case "Textbooks":
                return true
            default:
                return false
        }
    })
}

// Helper function to calculate the total amount of essential spending
function calculateEssentialSpendingTotal(expenses: Expense[], totalExpenses: number): number {
    return (filterEssentialCategories(expenses).reduce((sum, expense) => sum + expense.amount, 0) / totalExpenses) * 100
}

function getExpenseRatioColor(totalIncome: number, totalExpenses: number): string {
    if (totalIncome <= 0) return "bg-red-500"

    const ratio = totalExpenses / totalIncome
    if (ratio <= 0.7) return "bg-green-500"
    if (ratio <= 0.9) return "bg-yellow-500"
    return "bg-red-500"
}
