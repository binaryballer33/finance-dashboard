import type { Expense } from "@prisma/client"

import { useState } from "react"

import { format } from "date-fns"
import { X } from "lucide-react"
import { Cell, Pie, PieChart as RePieChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import type { DateRange } from "../utils/types"

import COLORS from "../utils/constants"
import formatAmount from "../utils/format-amount"
import getFilteredArrayByDateRange from "../utils/get-filtered-array-by-date-range"

type ExpenseBreakdownPieChartProps = {
    categoryTotals: { category: string; total: number }[]
    dateRange: DateRange
    expenses: Expense[]
}

export default function ExpenseBreakdownPieChart(props: ExpenseBreakdownPieChartProps) {
    const { categoryTotals, dateRange, expenses } = props

    const [activeCategory, setActiveCategory] = useState<any | null>(null)
    const filteredExpenses = getFilteredArrayByDateRange(expenses, dateRange)

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
                            onClick={(data) => handleClick(data.payload)}
                            outerRadius={80}
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
                            <Button className="h-6 w-6" onClick={handleCloseTooltip} size="icon" variant="ghost">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="mb-2 text-sm">Total: ${formatAmount(Number(activeCategory.total))}</p>

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
                                                    {exp.description || "N/A"} - ${formatAmount(exp.amount)} on{" "}
                                                    {format(new Date(exp.date), "PP")}
                                                </li>
                                            ))}
                                    </ul>
                                </>
                            )}

                            {/* No items message */}
                            {filteredExpenses.filter((exp) => exp.category === activeCategory.category).length ===
                                0 && (
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
