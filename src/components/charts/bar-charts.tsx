"use client"

import { useEffect, useState } from "react"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    { amount: 1200, category: "Housing" },
    { amount: 450, category: "Food" },
    { amount: 320, category: "Transport" },
    { amount: 280, category: "Shopping" },
    { amount: 180, category: "Utilities" },
    { amount: 150, category: "Other" },
]

export default function BarChart() {
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
                <RechartsBarChart
                    data={data}
                    margin={{
                        bottom: 0,
                        left: 10,
                        right: 10,
                        top: 5,
                    }}
                >
                    <XAxis axisLine={false} dataKey="category" fontSize={12} stroke="#888888" tickLine={false} />
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
                                        <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                {payload[0].payload.category}
                                            </span>
                                            <span className="font-bold">${payload[0].value}</span>
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        }}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    )
}
