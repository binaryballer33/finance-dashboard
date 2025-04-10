import { useCallback } from "react"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Transaction = {
    amount: number
    category: string
    date: string
    description: string
    id: string
    type: "expense" | "income"
}
type DailySpendingChartProps = {
    transactions: Transaction[]
}

export default function DailySpendingChart(props: DailySpendingChartProps) {
    const { transactions } = props

    // Prepare data for daily spending
    const prepareDailyData = useCallback(() => {
        const dailyData = new Map<string, number>()

        // Get last 14 days
        const today = new Date()
        for (let i = 13; i >= 0; i -= 1) {
            const day = new Date(today)
            day.setDate(today.getDate() - i)
            const dayKey = day.toISOString().split("T")[0]
            dailyData.set(dayKey, 0)
        }

        // Fill with transaction data
        transactions
            .filter((t) => t.type === "expense")
            .forEach((t) => {
                if (dailyData.has(t.date)) {
                    dailyData.set(t.date, (dailyData.get(t.date) || 0) + t.amount)
                }
            })

        return Array.from(dailyData.entries()).map(([date, amount]) => ({
            amount,
            date: new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short" }),
        }))
    }, [transactions])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Spending</CardTitle>
                <CardDescription>Your expenses over the last 14 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer height="100%" width="100%">
                    <AreaChart data={prepareDailyData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ReTooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                        <Area dataKey="amount" fill="#ef4444" fillOpacity={0.2} stroke="#ef4444" type="monotone" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
