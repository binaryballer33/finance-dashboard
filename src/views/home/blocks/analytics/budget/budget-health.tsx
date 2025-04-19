import type { Expense } from "@prisma/client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type BudgetHealthProps = {
    calculateTotalExpenses: () => number
    calculateTotalIncome: () => number
    expenses: Expense[]
    filteredExpenses: Expense[]
}

// Helper function to determine expense ratio color
// Moved outside component to prevent recreation on each render
function getExpenseRatioColor(totalIncome: number, totalExpenses: number): string {
    if (totalIncome <= 0) return "bg-red-500"

    const ratio = totalExpenses / totalIncome
    if (ratio <= 0.7) return "bg-green-500"
    if (ratio <= 0.9) return "bg-yellow-500"
    return "bg-red-500"
}

export default function BudgetHealth(props: BudgetHealthProps) {
    const { calculateTotalExpenses, calculateTotalIncome, expenses, filteredExpenses } = props

    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget Health</CardTitle>
                <CardDescription>How Well You're Managing Your Finances</CardDescription>
            </CardHeader>

            <CardContent>
                {expenses.length > 0 ? (
                    <div className="space-y-6">
                        <div>
                            <div className="mb-1 flex justify-between">
                                <span className="text-sm font-medium">Savings Rate</span>
                                <span className="text-sm font-medium">
                                    {calculateTotalIncome() > 0
                                        ? `${(((calculateTotalIncome() - calculateTotalExpenses()) / calculateTotalIncome()) * 100).toFixed(0)}%`
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-muted">
                                <div
                                    className="h-2.5 rounded-full bg-green-500"
                                    style={{
                                        width: `${
                                            calculateTotalIncome() > 0
                                                ? Math.min(
                                                      ((calculateTotalIncome() - calculateTotalExpenses()) /
                                                          calculateTotalIncome()) *
                                                          100,
                                                      100,
                                                  )
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
                                    {calculateTotalIncome() > 0
                                        ? `${((calculateTotalExpenses() / calculateTotalIncome()) * 100).toFixed(0)}%`
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-muted">
                                <div
                                    className={`h-2.5 rounded-full ${getExpenseRatioColor(calculateTotalIncome(), calculateTotalExpenses())}`}
                                    style={{
                                        width: `${
                                            calculateTotalIncome() > 0
                                                ? Math.min(
                                                      (calculateTotalExpenses() / calculateTotalIncome()) * 100,
                                                      100,
                                                  )
                                                : 0
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
                                    {calculateTotalExpenses() > 0
                                        ? `${(
                                              (filteredExpenses
                                                  .filter(
                                                      (t) =>
                                                          t.category === "Food" ||
                                                          t.category === "Housing" ||
                                                          t.category === "Transportation" ||
                                                          t.category === "Utilities" ||
                                                          t.category === "Health" ||
                                                          t.category === "Education" ||
                                                          t.category === "Tuition" ||
                                                          t.category === "Textbooks",
                                                  )
                                                  .reduce((sum, t) => sum + t.amount, 0) /
                                                  calculateTotalExpenses()) *
                                              100
                                          ).toFixed(0)}% Essential`
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="flex h-2.5 w-full rounded-full bg-muted">
                                <div
                                    className="h-2.5 rounded-l-full bg-blue-500"
                                    style={{
                                        width: `${
                                            calculateTotalExpenses() > 0
                                                ? (filteredExpenses
                                                      .filter(
                                                          (t) =>
                                                              t.category === "Food" ||
                                                              t.category === "Housing" ||
                                                              t.category === "Transportation" ||
                                                              t.category === "Utilities" ||
                                                              t.category === "Health" ||
                                                              t.category === "Education" ||
                                                              t.category === "Tuition" ||
                                                              t.category === "Textbooks",
                                                      )
                                                      .reduce((sum, t) => sum + t.amount, 0) /
                                                      calculateTotalExpenses()) *
                                                  100
                                                : 0
                                        }%`,
                                    }}
                                />
                                <div
                                    className="h-2.5 rounded-r-full bg-purple-500"
                                    style={{
                                        width: `${
                                            calculateTotalExpenses() > 0
                                                ? 100 -
                                                  (filteredExpenses
                                                      .filter(
                                                          (t) =>
                                                              t.category === "Food" ||
                                                              t.category === "Housing" ||
                                                              t.category === "Transportation" ||
                                                              t.category === "Utilities" ||
                                                              t.category === "Health" ||
                                                              t.category === "Education" ||
                                                              t.category === "Tuition" ||
                                                              t.category === "Textbooks",
                                                      )
                                                      .reduce((sum, t) => sum + t.amount, 0) /
                                                      calculateTotalExpenses()) *
                                                      100
                                                : 0
                                        }%`,
                                    }}
                                />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Balance Between Essential (Blue) and Non-essential (Purple) Spending
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground">Add Transactions to See Your Budget Health</p>
                )}
            </CardContent>
        </Card>
    )
}
