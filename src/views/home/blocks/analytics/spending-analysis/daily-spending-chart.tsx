import type { DateRange } from "@/types/date-range"
import type { Expense } from "@prisma/client"

import { useCallback } from "react"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartTooltip } from "@/components/ui/chart"

import formatAmount from "../utils/format-amount"
import getDailyTransactionTotals from "../utils/get-daily-transaction-totals"
import getTimeframeString from "../utils/get-timeframe-string"

type DailySpendingChartProps = {
    dateRange: DateRange
    expenses: Expense[]
}

export default function DailySpendingChart(props: DailySpendingChartProps) {
    const { dateRange, expenses } = props

    // prepare data for daily spending
    const dailyTransactionTotals = useCallback(
        () => getDailyTransactionTotals(expenses, dateRange),
        [expenses, dateRange],
    )

    return (
        <Card>
            <CardHeader className="pb-2">
                <div>
                    <CardTitle>Daily Spending</CardTitle>
                    <CardDescription className="mt-2">Your Expenses {getTimeframeString(dateRange)}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer height="100%" width="100%">
                    <AreaChart data={dailyTransactionTotals()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(value, index) => {
                                // For longer periods, only show some of the dates to avoid overcrowding
                                if (dateRange === "1y" && index % 30 !== 0) return ""
                                if (dateRange === "6m" && index % 15 !== 0) return ""
                                if (dateRange === "3m" && index % 7 !== 0) return ""
                                return value
                            }}
                        />
                        <YAxis />
                        <ChartTooltip content={<CustomTooltip />} cursor={false} />

                        <Area dataKey="amount" fill="#ef4444" fillOpacity={0.2} stroke="#ef4444" type="monotone" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

type CustomTooltipProps = {
    active?: boolean
    label?: string
    payload?: any[]
}

function CustomTooltip({ active, label, payload }: CustomTooltipProps) {
    if (active && payload && payload.length && label) {
        const dailyExpenses: Expense[] = payload[0]?.payload.expenses.sort((a, b) => b.amount - a.amount) || []
        const dailyTotal: number = payload[0]?.payload.amount || 0
        const dateString: string = payload[0]?.payload.completeDateString || ""

        return (
            <Card className="rounded border bg-background p-3 text-sm shadow-sm">
                <CardHeader className="mb-2 font-medium text-foreground">
                    <p>{getDayJsDateWithPlugins(dateString).format("dddd, MMMM D, YYYY")}</p>
                    <p className="text-muted-foreground">Transactions: {dailyExpenses.length}</p>
                </CardHeader>

                <CardContent className="flex flex-col gap-1.5">
                    {dailyExpenses.map((expense) => (
                        <div className="flex gap-1" key={expense.id}>
                            <p className="text-muted-foreground">${formatAmount(expense.amount)}</p>
                            <p className="text-muted-foreground">{expense.category}</p>
                            <p className="text-muted-foreground">{expense.description?.slice(0, 20)}</p>
                        </div>
                    ))}
                    <p>Daily Total: ${formatAmount(dailyTotal)}</p>
                </CardContent>
            </Card>
        )
    }

    return null
}
