import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type MonthlyIncomeExpenseBarChartProps = {
    prepareMonthlyData: () => any[]
}

export default function MonthlyIncomeExpenseBarChart(props: MonthlyIncomeExpenseBarChartProps) {
    const { prepareMonthlyData } = props

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                <CardDescription>Income vs Expenses over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer height="100%" width="100%">
                    <BarChart data={prepareMonthlyData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ReTooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                        <Legend />
                        <Bar dataKey="income" fill="#10b981" name="Income" />
                        <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
