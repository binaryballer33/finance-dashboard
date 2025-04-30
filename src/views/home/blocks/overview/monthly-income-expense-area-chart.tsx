"use client"

import type { ChartConfig } from "@/components/ui/chart"
import type { MonthlyData } from "@/types/monthly-data"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

import formatAmount from "../../../../lib/financial-calculations/format-amount"

type MonthlyIncomeExpenseAreaChartProps = {
    monthlyData: MonthlyData[]
    visibility: {
        balance: boolean
        expenses: boolean
        income: boolean
    }
}

const chartConfig = {
    balance: {
        color: "#f59e0b",
        label: "Balance",
    },
    expenses: {
        color: "#ef4444",
        label: "Expenses",
    },
    income: {
        color: "#10b981",
        label: "Income",
    },
} satisfies ChartConfig

export default function MonthlyIncomeExpenseAreaChart(props: MonthlyIncomeExpenseAreaChartProps) {
    const { monthlyData, visibility } = props

    return (
        <div className="h-[300px] w-full">
            <ChartContainer className="h-full w-full" config={chartConfig}>
                <AreaChart
                    accessibilityLayer
                    data={monthlyData}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />

                    <XAxis
                        axisLine={false}
                        dataKey="name"
                        tickFormatter={(value) => value.slice(0, 3)}
                        tickLine={false}
                        tickMargin={8}
                    />

                    <YAxis axisLine={false} tickLine={false} tickMargin={8} />

                    <ChartTooltip content={<CustomTooltip />} cursor={false} />

                    <Area
                        dataKey="income"
                        fill={chartConfig.income.color}
                        fillOpacity={0.4}
                        hide={!visibility.income}
                        stroke={chartConfig.income.color}
                        type="natural"
                    />

                    <Area
                        dataKey="expenses"
                        fill={chartConfig.expenses.color}
                        fillOpacity={0.4}
                        hide={!visibility.expenses}
                        stroke={chartConfig.expenses.color}
                        type="natural"
                    />

                    <Area
                        dataKey="balance"
                        fill={chartConfig.balance.color}
                        fillOpacity={0.4}
                        hide={!visibility.balance}
                        stroke={chartConfig.balance.color}
                        type="natural"
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    )
}

type CustomTooltipProps = {
    active?: boolean
    label?: string
    payload?: any[]
}

const CustomTooltip = ({ active, label, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length && label) {
        const incomeData = payload.find((p) => p.dataKey === "income")
        const expenseData = payload.find((p) => p.dataKey === "expenses")
        const balanceData = payload.find((p) => p.dataKey === "balance")

        const entry = payload[0]?.payload || {}
        const recurringExpenses = entry.recurringExpensesTotal || 0
        const oneTimeExpenses = entry.oneTimeExpensesTotal || 0

        return (
            <div className="rounded border bg-background p-3 text-sm shadow-sm">
                <p className="mb-2 font-medium text-foreground">{label}</p>
                <div className="flex flex-col gap-1.5">
                    {incomeData && (
                        <p style={{ color: chartConfig.income.color }}>
                            Income: ${formatAmount(Number(incomeData.value))}
                        </p>
                    )}

                    {expenseData && (
                        <div className="my-1 border-y py-1 text-xs">
                            <p style={{ color: chartConfig.expenses.color }}>
                                Expenses: ${formatAmount(Number(expenseData.value))}
                            </p>

                            {(recurringExpenses > 0 || oneTimeExpenses > 0) && (
                                <ul className="ml-2 list-disc pl-2 text-muted-foreground">
                                    <li>Recurring: ${formatAmount(Number(recurringExpenses))}</li>
                                    <li>One-Time: ${formatAmount(Number(oneTimeExpenses))}</li>
                                </ul>
                            )}
                        </div>
                    )}

                    {balanceData && (
                        <p style={{ color: chartConfig.balance.color }}>
                            Balance: ${formatAmount(Number(balanceData.value))}
                        </p>
                    )}
                </div>
            </div>
        )
    }

    return null
}
