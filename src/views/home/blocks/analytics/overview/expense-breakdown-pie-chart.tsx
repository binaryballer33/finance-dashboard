import { Cell, Pie, PieChart as RePieChart, ResponsiveContainer } from "recharts"
import { format } from "date-fns"
import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

import COLORS from "../utils/constants"
import { Expense, Transaction } from "@prisma/client"
import { DateRange } from "../utils/types"
import getFilteredArrayByDateRange from "../utils/get-filtered-array-by-date-range"

type ExpenseBreakdownPieChartProps = {
    categoryTotals: { category: string; total: number }[]
    expenses: Expense[]
    transactions: Transaction[]
    dateRange: DateRange
}

export default function ExpenseBreakdownPieChart(props: ExpenseBreakdownPieChartProps) {
    const { categoryTotals, expenses, transactions, dateRange } = props

    const [activeCategory, setActiveCategory] = useState<any | null>(null)
    const filteredExpenses = getFilteredArrayByDateRange(expenses, dateRange)
    const filteredTransactions = getFilteredArrayByDateRange(transactions, dateRange)

    // Handle pie slice click
    const handleClick = (data: any) => {
        if (activeCategory && activeCategory.category === data.category) setActiveCategory(null)
        else setActiveCategory(data)
    }
    const handleCloseTooltip = () => setActiveCategory(null)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Where Your Money Is Going</CardDescription>
            </CardHeader>
            <CardContent className="relative h-[300px]">
                <ResponsiveContainer height="100%" width="100%">
                    <RePieChart>
                        <Pie
                            animationDuration={300}
                            cx="50%"
                            cy="50%"
                            data={categoryTotals}
                            dataKey="total"
                            fill="#8884d8"
                            label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                            outerRadius={80}
                            onClick={(data) => handleClick(data.payload)}
                        >
                            {categoryTotals.map((_entry, index) => (
                                <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
                            ))}
                        </Pie>
                    </RePieChart>
                </ResponsiveContainer>

                {/* Click-activated tooltip */}
                {activeCategory && (
                    <div className="absolute right-0 top-0 z-50 w-64 rounded-lg bg-background p-2 shadow-lg">
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{activeCategory.category}</h3>
                            <Button size="icon" variant="ghost" onClick={handleCloseTooltip} className="h-6 w-6">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="mb-2 text-sm">Total: ${Number(activeCategory.total).toFixed(2)}</p>

                        <ScrollArea className="h-[300px] space-y-4 overflow-y-auto pr-4">
                            {/* Expenses */}
                            {filteredExpenses.filter((exp) => exp.category === activeCategory.category).length > 0 && (
                                <>
                                    <h4 className="mb-1 mt-2 text-sm font-semibold">Expenses:</h4>
                                    <ul className="list-disc space-y-1 pl-4 text-xs">
                                        {filteredExpenses
                                            .filter((exp) => exp.category === activeCategory.category)
                                            .map((exp) => (
                                                <li key={`exp-${exp.id}`}>
                                                    {exp.description || "N/A"} - ${exp.amount.toFixed(2)} on{" "}
                                                    {format(new Date(exp.date), "PP")}
                                                </li>
                                            ))}
                                    </ul>
                                </>
                            )}

                            {/* Transactions */}
                            {filteredTransactions.filter((trx) => trx.category === activeCategory.category).length >
                                0 && (
                                <>
                                    <h4 className="mb-1 mt-2 text-sm font-semibold">Transactions:</h4>
                                    <ul className="list-disc space-y-1 pl-4 text-xs">
                                        {filteredTransactions
                                            .filter((trx) => trx.category === activeCategory.category)
                                            .map((trx) => (
                                                <li key={`trx-${trx.id}`}>
                                                    {trx.description || "N/A"} - ${trx.amount.toFixed(2)} on{" "}
                                                    {format(new Date(trx.date), "PP")}
                                                </li>
                                            ))}
                                    </ul>
                                </>
                            )}

                            {/* No items message */}
                            {filteredExpenses.filter((exp) => exp.category === activeCategory.category).length === 0 &&
                                filteredTransactions.filter((trx) => trx.category === activeCategory.category)
                                    .length === 0 && (
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        No individual items found for this category.
                                    </p>
                                )}
                        </ScrollArea>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
