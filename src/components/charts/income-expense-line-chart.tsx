import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type IncomeExpenseLineChartProps = {
    data: {
        balance: number
        expenses: number
        income: number
        name: string
    }[]
    showExpenses: boolean
    showIncome: boolean
}

export default function IncomeExpenseLineChart(props: IncomeExpenseLineChartProps) {
    const { data, showExpenses, showIncome } = props

    return (
        <ResponsiveContainer debounce={100} height="100%" width="100%">
            <LineChart
                data={data}
                margin={{
                    bottom: 0,
                    left: 10,
                    right: 10,
                    top: 5,
                }}
            >
                <XAxis axisLine={false} dataKey="name" fontSize={12} stroke="#888888" tickLine={false} />

                <YAxis
                    axisLine={false}
                    fontSize={12}
                    stroke="#888888"
                    tickFormatter={(value) => `$${value}`}
                    tickLine={false}
                />

                <Tooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid gap-2">
                                        {showIncome && payload[0] && (
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                    Income
                                                </span>
                                                <span className="font-bold text-emerald-500">${payload[0].value}</span>
                                            </div>
                                        )}
                                        {showExpenses && payload[1] && (
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                    Expenses
                                                </span>
                                                <span className="font-bold text-rose-500">${payload[1].value}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                        return null
                    }}
                />

                {showIncome && (
                    <Line
                        activeDot={{
                            r: 6,
                            style: { fill: "#10b981", opacity: 0.25 },
                        }}
                        animationDuration={300}
                        dataKey="income"
                        stroke="#10b981"
                        strokeWidth={2}
                        type="monotone"
                    />
                )}

                {showExpenses && (
                    <Line
                        activeDot={{
                            r: 6,
                            style: { fill: "#ef4444", opacity: 0.25 },
                        }}
                        animationDuration={300}
                        dataKey="expenses"
                        stroke="#ef4444"
                        strokeWidth={2}
                        type="monotone"
                    />
                )}
            </LineChart>
        </ResponsiveContainer>
    )
}
