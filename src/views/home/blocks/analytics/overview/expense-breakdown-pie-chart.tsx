import { Cell, Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip as ReTooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { COLORS } from "../utils/constants"

type ExpenseBreakdownBarChartProps = {
    categoryData: { category: string; total: number }[]
}

export default function ExpenseBreakdownPieChart(props: ExpenseBreakdownBarChartProps) {
    const { categoryData } = props

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
                            cx="50%"
                            cy="50%"
                            data={categoryData}
                            dataKey="total"
                            fill="#8884d8"
                            label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                            outerRadius={80}
                        >
                            {categoryData.map((_entry, index) => (
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
