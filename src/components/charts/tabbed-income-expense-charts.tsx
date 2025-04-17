"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import IncomeExpenseBarChart from "./income-expense-bar-chart"
import IncomeExpenseLineChart from "./income-expense-line-chart"

const data = [
    { expenses: 1800, income: 2500, month: "Jan" },
    { expenses: 2100, income: 3200, month: "Feb" },
    { expenses: 2400, income: 3800, month: "Mar" },
    { expenses: 2000, income: 4100, month: "Apr" },
    { expenses: 2300, income: 4500, month: "May" },
    { expenses: 2180, income: 4325, month: "Jun" },
]

type TabbedIncomeExpenseChartsProps = {
    monthlyData: {
        balance: number
        expenses: number
        income: number
        name: string
    }[]
}

export default function TabbedIncomeExpenseCharts(props: TabbedIncomeExpenseChartsProps) {
    const { monthlyData } = props

    const [showIncome, setShowIncome] = useState(true)
    const [showExpenses, setShowExpenses] = useState(true)
    const [mounted, setMounted] = useState(false)

    // Only render the charts after component is mounted
    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    if (!mounted) return <div className="h-[400px] w-full animate-pulse rounded-md bg-muted/20" />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>View Your Income and Expenses in Different Chart Formats</CardDescription>
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
                        <IncomeExpenseLineChart
                            data={monthlyData}
                            showExpenses={showExpenses}
                            showIncome={showIncome}
                        />
                    </TabsContent>

                    <TabsContent className="h-[300px]" value="bar">
                        <IncomeExpenseBarChart data={monthlyData} showExpenses={showExpenses} showIncome={showIncome} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
