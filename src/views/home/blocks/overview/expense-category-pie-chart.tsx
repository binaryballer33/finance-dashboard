"use client"

import type { CategoryData } from "@/types/category-data"
import type { DateRange } from "@/types/date-range"
import type { Expense } from "@prisma/client"

import { useState } from "react"

import { categoryColors } from "@/mocks/categories"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import formatAmount from "../../../../lib/financial-calculations/format-amount"
import getTimeframeString from "../../../../lib/financial-calculations/get-timeframe-string"

// Colors array for the pie chart
const COLORS = Object.values(categoryColors)

type ExpenseCategoryPieChartProps = {
    categoryData: CategoryData[]
    dateRange: DateRange
    expenses: Expense[]
}

export default function ExpenseCategoryPieChart(props: ExpenseCategoryPieChartProps) {
    const { categoryData, dateRange, expenses } = props

    const [selectedCategoryName, setSelectedCategoryName] = useState<string>("")

    const selectedCategory = selectedCategoryName
        ? categoryData.find((c) => c.category === selectedCategoryName) || null
        : null

    // Create an "all expenses" category data object for displaying all transactions
    const allExpensesData: CategoryData = {
        category: "All Expenses",
        color: "bg-accent",
        monthlyTotalExpenses: categoryData[0].monthlyTotalExpenses,
        percentage: 100,
        total: categoryData[0].monthlyTotalExpenses,
        transactions: expenses,
    }

    const handleClick = (data: CategoryData) => setSelectedCategoryName(data.category)

    return (
        <div className="mx-auto h-[906px] w-full">
            <Card className="flex h-full flex-col">
                <CardHeader className="shrink-0">
                    <CardTitle className="flex items-center justify-between">
                        <p>Expense Distribution By Category</p>

                        <Button className="p-2" onClick={() => setSelectedCategoryName("")}>
                            All Expenses
                        </Button>
                    </CardTitle>

                    <CardDescription>Click On A Slice To View Detailed Transactions</CardDescription>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <span className="font-medium">Total Transactions:</span>
                                <span>{expenses.length}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium">Total Amount:</span>
                                <span>${formatAmount(expenses.reduce((sum, expense) => sum + expense.amount, 0))}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <span className="font-medium">Categories:</span>
                                <span>{categoryData.length}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium">Date Range:</span>
                                <span>{getTimeframeString(dateRange)}</span>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-hidden">
                    <div className="flex h-full flex-col overflow-hidden">
                        <div className="h-3/5 w-full">
                            <ResponsiveContainer height="100%" width="100%">
                                <PieChart>
                                    <Pie
                                        animationDuration={300}
                                        cx="50%"
                                        cy="50%"
                                        data={categoryData}
                                        dataKey="total"
                                        fill="#8884d8"
                                        label={({ category, cx, cy, midAngle, outerRadius, percentage }) => {
                                            const RADIAN = Math.PI / 180
                                            // Position the label further away from the pie
                                            const radius = outerRadius * 1.4

                                            // Calculate position with proper spacing
                                            const x = cx + radius * Math.cos(-midAngle * RADIAN)
                                            const y = cy + radius * Math.sin(-midAngle * RADIAN)

                                            // Only show labels for segments with percentage >= 2 to avoid cluttering
                                            if (percentage < 2) return null

                                            return (
                                                <text
                                                    className="text-sm"
                                                    dominantBaseline="central"
                                                    fill={categoryColors[category]}
                                                    fontWeight="bold"
                                                    textAnchor={x > cx ? "start" : "end"}
                                                    x={x}
                                                    y={y}
                                                >
                                                    {`${category}: ${percentage}%`}
                                                </text>
                                            )
                                        }}
                                        labelLine={false}
                                        nameKey="category"
                                        onClick={handleClick}
                                        outerRadius={100}
                                    >
                                        {categoryData.map((entry: any, index: number) => (
                                            <Cell
                                                fill={categoryColors[entry.category] || COLORS[index % COLORS.length]}
                                                key={`cell-${index}`}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload

                                                return (
                                                    <div className="rounded-md border bg-background p-2 shadow-md">
                                                        <p
                                                            className="font-medium"
                                                            style={{ color: categoryColors[data.category] }}
                                                        >
                                                            {data.category}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            ${data.total.toFixed(2)} ({data.percentage}%)
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {data.transactions.length}{" "}
                                                            {`${data.transactions.length === 1 ? "Transaction" : "Transactions"}`}
                                                        </p>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="h-2/5 w-full overflow-hidden border-t">
                            {selectedCategory ? (
                                <TransactionDetails categoryData={selectedCategory} />
                            ) : (
                                <TransactionDetails categoryData={allExpensesData} />
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

type TransactionDetailsProps = {
    categoryData: CategoryData
}

const TransactionDetails = (props: TransactionDetailsProps) => {
    const { categoryData } = props

    const color = categoryData.color || "#000000"

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b p-2" style={{ borderTop: `4px solid ${color}` }}>
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{categoryData.category}</h2>

                    <Badge style={{ backgroundColor: color }}>{categoryData.percentage}%</Badge>

                    <p className="text-muted-foreground">
                        Total: ${formatAmount(categoryData.total)} • {categoryData.transactions.length} Transactions
                    </p>
                </div>
            </div>

            <ScrollArea className="flex-1 p-2">
                <div className="space-y-1">
                    {categoryData.transactions.map((transaction) => {
                        const transactionPercentageOfTotal = Number(
                            ((transaction.amount / categoryData.monthlyTotalExpenses) * 100).toFixed(2),
                        )
                        const categoryColor = categoryColors[transaction.category] || color

                        return (
                            <div className="rounded-md border bg-card p-2 dark:border-gray-500" key={transaction.id}>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{transaction.description}</span>

                                    <div className="flex items-center gap-2">
                                        <Badge style={{ backgroundColor: categoryColor, color: "black" }}>
                                            {transactionPercentageOfTotal}%
                                        </Badge>
                                        <span className="font-semibold">${formatAmount(transaction.amount)}</span>
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {getDayJsDateWithPlugins(transaction.date).format("MMM D, YYYY")}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}
