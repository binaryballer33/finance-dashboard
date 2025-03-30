"use client"

import { useEffect, useState } from "react"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    { expenses: 1800, income: 2500, month: "Jan" },
    { expenses: 2100, income: 3200, month: "Feb" },
    { expenses: 2400, income: 3800, month: "Mar" },
    { expenses: 2000, income: 4100, month: "Apr" },
    { expenses: 2300, income: 4500, month: "May" },
    { expenses: 2180, income: 4325, month: "Jun" },
]

export default function AreaChart() {
    const [mounted, setMounted] = useState(false)

    // Only render the chart after component is mounted
    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    if (!mounted) {
        return <div className="h-[300px] w-full animate-pulse rounded-md bg-muted/20" />
    }

    return (
        <div className="h-[300px] w-full">
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
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                    Income
                                                </span>
                                                <span className="font-bold text-emerald-500">${payload[0].value}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                    Expenses
                                                </span>
                                                <span className="font-bold text-rose-500">${payload[1].value}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        }}
                    />
                    <Line
                        activeDot={{
                            r: 6,
                            style: { fill: "#10b981", opacity: 0.25 },
                        }}
                        dataKey="income"
                        stroke="#10b981"
                        strokeWidth={2}
                        type="monotone"
                    />
                    <Line
                        activeDot={{
                            r: 6,
                            style: { fill: "#ef4444", opacity: 0.25 },
                        }}
                        dataKey="expenses"
                        stroke="#ef4444"
                        strokeWidth={2}
                        type="monotone"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
