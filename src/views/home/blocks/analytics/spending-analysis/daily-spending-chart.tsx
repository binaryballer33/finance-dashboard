import type { Transaction } from "@prisma/client"

import { useCallback, useState } from "react"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis } from "recharts"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import type { DateRange } from "../utils/types"

import DateRangeSelector from "../common/date-range-selector"
import getChartTitle from "../utils/get-chart-title"
import getDaysInRange from "../utils/get-days-in-range"

type DailySpendingChartProps = {
    transactions: Pick<Transaction, "amount" | "category" | "date" | "description">[]
}

export default function DailySpendingChart(props: DailySpendingChartProps) {
    const { transactions } = props

    const [dateRange, setDateRange] = useState<DateRange>("14d")

    // prepare data for daily spending
    const getDailyTransactionTotals = useCallback(() => {
        const daysInRange = getDaysInRange(dateRange)
        const dailySpending = new Map<string, number>()
        const today = getDayJsDateWithPlugins(new Date())

        // create the map with the selected range of days as the keys and initialize the values to 0
        for (let i = daysInRange; i >= 0; i -= 1) {
            const day = today.subtract(i, "day").format("YYYY-MM-DD")
            dailySpending.set(day, 0)
        }

        // get the total amount spent for each day
        transactions.forEach((tx) => {
            const txDate = getDayJsDateWithPlugins(tx.date).format("YYYY-MM-DD")
            if (dailySpending.has(txDate)) dailySpending.set(txDate, (dailySpending.get(txDate) || 0) + tx.amount)
        })

        // return the data in the format required by the chart
        return Array.from(dailySpending.entries()).map(([date, amount]) => ({
            amount,
            date: getDayJsDateWithPlugins(date).format("MM-DD"),
        }))
    }, [transactions, dateRange])

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Daily Spending</CardTitle>
                        <CardDescription className="mt-2">Your Expenses {getChartTitle(dateRange)}</CardDescription>
                    </div>

                    <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
                </div>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer height="100%" width="100%">
                    <AreaChart data={getDailyTransactionTotals()}>
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
                        <ReTooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                        <Area dataKey="amount" fill="#ef4444" fillOpacity={0.2} stroke="#ef4444" type="monotone" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
