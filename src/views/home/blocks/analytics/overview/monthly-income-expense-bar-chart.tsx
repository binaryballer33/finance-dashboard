import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type MonthlyIncomeExpenseBarChartProps = {
    monthlyData: {
        balance: number
        expenses: number
        income: number
        name: string
    }[]
}

export default function MonthlyIncomeExpenseBarChart(props: MonthlyIncomeExpenseBarChartProps) {
    const { monthlyData } = props

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                <CardDescription>Income, Expenses, Transactions And Savings Balance Monthly Totals</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer height="100%" width="100%">
                    <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ReTooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                        <Legend />
                        <Bar dataKey="income" fill="#10b981" name="Income" />
                        <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                        <Bar dataKey="transactions" fill="#f59e0b" name="Transactions" />
                        <Bar dataKey="balance" fill="#3b82f6" name="Balance" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
