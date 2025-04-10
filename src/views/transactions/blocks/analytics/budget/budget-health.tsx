import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import type { Transaction } from "../utils/types"

type BudgetHealthProps = {
    calculateTotalExpenses: () => number
    calculateTotalIncome: () => number
    filteredTransactions: Transaction[]
    transactions: Transaction[]
}

export default function BudgetHealth(props: BudgetHealthProps) {
    const { calculateTotalExpenses, calculateTotalIncome, filteredTransactions, transactions } = props

    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget Health</CardTitle>
                <CardDescription>How well you're managing your finances</CardDescription>
            </CardHeader>
            <CardContent>
                {transactions.length > 0 ? (
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
                            <p className="mt-1 text-xs text-muted-foreground">Aim for at least 20% savings rate</p>
                        </div>

                        <div>
                            <div className="mb-1 flex justify-between">
                                <span className="text-sm font-medium">Expense to Income Ratio</span>
                                <span className="text-sm font-medium">
                                    {calculateTotalIncome() > 0
                                        ? `${((calculateTotalExpenses() / calculateTotalIncome()) * 100).toFixed(0)}%`
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-muted">
                                <div
                                    className={`h-2.5 rounded-full ${
                                        calculateTotalIncome() > 0 &&
                                        calculateTotalExpenses() / calculateTotalIncome() <= 0.7
                                            ? "bg-green-500"
                                            : calculateTotalIncome() > 0 &&
                                                calculateTotalExpenses() / calculateTotalIncome() <= 0.9
                                              ? "bg-yellow-500"
                                              : "bg-red-500"
                                    }`}
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
                            <p className="mt-1 text-xs text-muted-foreground">Keep expenses below 70% of income</p>
                        </div>

                        <div>
                            <div className="mb-1 flex justify-between">
                                <span className="text-sm font-medium">Essential vs. Non-essential Spending</span>
                                <span className="text-sm font-medium">
                                    {calculateTotalExpenses() > 0
                                        ? `${(
                                              (filteredTransactions
                                                  .filter(
                                                      (t) =>
                                                          t.type === "expense" &&
                                                          (t.category === "Food" ||
                                                              t.category === "Housing" ||
                                                              t.category === "Transportation" ||
                                                              t.category === "Utilities" ||
                                                              t.category === "Health" ||
                                                              t.category === "Education" ||
                                                              t.category === "Tuition" ||
                                                              t.category === "Textbooks"),
                                                  )
                                                  .reduce((sum, t) => sum + t.amount, 0) /
                                                  calculateTotalExpenses()) *
                                              100
                                          ).toFixed(0)}% essential`
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="flex h-2.5 w-full rounded-full bg-muted">
                                <div
                                    className="h-2.5 rounded-l-full bg-blue-500"
                                    style={{
                                        width: `${
                                            calculateTotalExpenses() > 0
                                                ? (filteredTransactions
                                                      .filter(
                                                          (t) =>
                                                              t.type === "expense" &&
                                                              (t.category === "Food" ||
                                                                  t.category === "Housing" ||
                                                                  t.category === "Transportation" ||
                                                                  t.category === "Utilities" ||
                                                                  t.category === "Health" ||
                                                                  t.category === "Education" ||
                                                                  t.category === "Tuition" ||
                                                                  t.category === "Textbooks"),
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
                                                  (filteredTransactions
                                                      .filter(
                                                          (t) =>
                                                              t.type === "expense" &&
                                                              (t.category === "Food" ||
                                                                  t.category === "Housing" ||
                                                                  t.category === "Transportation" ||
                                                                  t.category === "Utilities" ||
                                                                  t.category === "Health" ||
                                                                  t.category === "Education" ||
                                                                  t.category === "Tuition" ||
                                                                  t.category === "Textbooks"),
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
                                Balance between essential (blue) and non-essential (purple) spending
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground">Add transactions to see your budget health</p>
                )}
            </CardContent>
        </Card>
    )
}
