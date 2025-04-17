import { Cell, Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip as ReTooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { COLORS } from "../utils/constants"

type ExpenseBreakdownBarChartProps = {
    categoryTotals: { category: string; total: number }[]
}

export default function ExpenseBreakdownBarChart(props: ExpenseBreakdownBarChartProps) {
    const { categoryTotals } = props

    return (
        <Card>
            <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Where Your Money Is Going</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
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
                        >
                            {categoryTotals.map((_entry, index) => (
                                <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
                            ))}
                        </Pie>
                        <ReTooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                    </RePieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
