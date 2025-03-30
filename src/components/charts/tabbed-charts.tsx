"use client"

import { useEffect, useState } from "react"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const data = [
    { expenses: 1800, income: 2500, month: "Jan" },
    { expenses: 2100, income: 3200, month: "Feb" },
    { expenses: 2400, income: 3800, month: "Mar" },
    { expenses: 2000, income: 4100, month: "Apr" },
    { expenses: 2300, income: 4500, month: "May" },
    { expenses: 2180, income: 4325, month: "Jun" },
]

export default function TabbedCharts() {
    const [showIncome, setShowIncome] = useState(true)
    const [showExpenses, setShowExpenses] = useState(true)
    const [mounted, setMounted] = useState(false)

    // Only render the charts after component is mounted
    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    if (!mounted) {
        return <div className="h-[400px] w-full animate-pulse rounded-md bg-muted/20" />
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>View your income and expenses in different chart formats</CardDescription>
                <div className="flex items-center space-x-4 pt-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            checked={showIncome}
                            id="show-income"
                            onCheckedChange={(checked) => setShowIncome(checked as boolean)}
                        />
                        <Label className="flex items-center" htmlFor="show-income">
                            <div className="mr-1.5 h-3 w-3 rounded-full bg-emerald-500" />
                            Income
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            checked={showExpenses}
                            id="show-expenses"
                            onCheckedChange={(checked) => setShowExpenses(checked as boolean)}
                        />
                        <Label className="flex items-center" htmlFor="show-expenses">
                            <div className="mr-1.5 h-3 w-3 rounded-full bg-rose-500" />
                            Expenses
                        </Label>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs className="w-full" defaultValue="area">
                    <TabsList className="mb-4 grid w-full grid-cols-2">
                        <TabsTrigger value="area">Area Chart</TabsTrigger>
                        <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                    </TabsList>
                    <TabsContent className="h-[300px]" value="area">
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
                                <XAxis
                                    axisLine={false}
                                    dataKey="month"
                                    fontSize={12}
                                    stroke="#888888"
                                    tickLine={false}
                                />
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
                                                                <span className="font-bold text-emerald-500">
                                                                    ${payload[0].value}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {showExpenses && payload[1] && (
                                                            <div className="flex flex-col">
                                                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                    Expenses
                                                                </span>
                                                                <span className="font-bold text-rose-500">
                                                                    ${payload[1].value}
                                                                </span>
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
                                        dataKey="expenses"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        type="monotone"
                                    />
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    </TabsContent>
                    <TabsContent className="h-[300px]" value="bar">
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
                                <XAxis
                                    axisLine={false}
                                    dataKey="month"
                                    fontSize={12}
                                    stroke="#888888"
                                    tickLine={false}
                                />
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
                                                                <span className="font-bold text-emerald-500">
                                                                    ${payload[0].value}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {showExpenses && payload[1] && (
                                                            <div className="flex flex-col">
                                                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                    Expenses
                                                                </span>
                                                                <span className="font-bold text-rose-500">
                                                                    ${payload[1].value}
                                                                </span>
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
                                    <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
                                )}
                                {showExpenses && (
                                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
                                )}
                            </BarChart>
                        </ResponsiveContainer>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
