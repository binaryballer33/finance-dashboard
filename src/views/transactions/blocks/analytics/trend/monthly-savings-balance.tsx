import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip as ReTooltip,
    XAxis,
    YAxis,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type MonthlySavingsBalanceProps = {
    prepareMonthlyData: () => { balance: number; name: string }[]
}

/* key is case sensitive */
const DATA_KEY = "balance"

export default function MonthlySavingsBalance(props: MonthlySavingsBalanceProps) {
    const { prepareMonthlyData } = props

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Balance Trend</CardTitle>
                <CardDescription>Your Net Balance Over The Last 6 Months</CardDescription>
            </CardHeader>

            <CardContent className="h-[300px]">
                <ResponsiveContainer height="100%" width="100%">
                    <LineChart data={prepareMonthlyData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ReTooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                        <Legend />
                        <Line
                            activeDot={{ r: 8 }}
                            dataKey={DATA_KEY}
                            stroke="#8884d8"
                            strokeWidth={2}
                            type="monotone"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
