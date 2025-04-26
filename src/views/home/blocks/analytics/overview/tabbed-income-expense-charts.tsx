"use client"

import type { MonthlyData } from "@/types/monthly-data"

import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import MonthlyIncomeExpenseAreaChart from "./monthly-income-expense-area-chart"
import MonthlyIncomeExpenseBarChart from "./monthly-income-expense-bar-chart"

type TabbedIncomeExpenseChartsProps = {
    monthlyData: MonthlyData[]
}

export default function TabbedIncomeExpenseCharts(props: TabbedIncomeExpenseChartsProps) {
    const { monthlyData } = props

    const [visibility, setVisibility] = useState({ balance: true, expenses: true, income: true })

    const [mounted, setMounted] = useState(false)

    // Only render the charts after component is mounted
    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    if (!mounted) return <div className="h-[400px] w-full animate-pulse rounded-md bg-muted/20" />

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Financial Overview</CardTitle>

                <div className="flex items-center space-x-4 pt-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            checked={visibility.income}
                            id="show-income"
                            onCheckedChange={(checked) => setVisibility({ ...visibility, income: !!checked })}
                        />
                        <Label className="flex items-center" htmlFor="show-income">
                            <div className="mr-1.5 h-3 w-3 rounded-full bg-emerald-500" />
                            Income
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            checked={visibility.expenses}
                            id="show-expenses"
                            onCheckedChange={(checked) => setVisibility({ ...visibility, expenses: !!checked })}
                        />
                        <Label className="flex items-center" htmlFor="show-expenses">
                            <div className="mr-1.5 h-3 w-3 rounded-full bg-rose-500" />
                            Expenses
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            checked={visibility.balance}
                            id="show-balance"
                            onCheckedChange={(checked) => setVisibility({ ...visibility, balance: !!checked })}
                        />
                        <Label className="flex items-center" htmlFor="show-balance">
                            <div className="mr-1.5 h-3 w-3 rounded-full bg-yellow-500" />
                            Balance
                        </Label>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <Tabs className="w-full" defaultValue="bar">
                    <TabsList className="mb-4 grid w-full grid-cols-2">
                        <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                        <TabsTrigger value="area">Area Chart</TabsTrigger>
                    </TabsList>

                    <TabsContent value="bar">
                        <MonthlyIncomeExpenseBarChart monthlyData={monthlyData} visibility={visibility} />
                    </TabsContent>

                    <TabsContent value="area">
                        <MonthlyIncomeExpenseAreaChart monthlyData={monthlyData} visibility={visibility} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
