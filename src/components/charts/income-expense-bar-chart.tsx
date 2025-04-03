"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type IncomeExpenseBarChartProps = {
    data: {
        expenses: number
        income: number
        month: string
    }[]
    showExpenses: boolean
    showIncome: boolean
}

export default function IncomeExpenseBarChart(props: IncomeExpenseBarChartProps) {
    const { data, showExpenses, showIncome } = props

    return (
        <ResponsiveContainer debounce={100} height="100%" width="100%">
            <BarChart
                data={data}
                margin={{
                    bottom: 0,
                    left: 10,
                    right: 10,
                    top: 5,
                }}
            >
                <XAxis axisLine={false} dataKey="month" fontSize={12} stroke="#888888" tickLine={false} />
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
                {showIncome && <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />}
                {showExpenses && <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />}
            </BarChart>
        </ResponsiveContainer>
    )
}
