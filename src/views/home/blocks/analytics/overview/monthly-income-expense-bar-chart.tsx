import type { MonthlyData } from "@/types/monthly-data"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis } from "recharts"

import formatAmount from "../utils/format-amount"

type MonthlyIncomeExpenseBarChartProps = {
    monthlyData: MonthlyData[]
    visibility: { balance: boolean; expenses: boolean; income: boolean }
}

export default function MonthlyIncomeExpenseBarChart(props: MonthlyIncomeExpenseBarChartProps) {
    const { monthlyData, visibility } = props

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer height="100%" width="100%">
                <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ReTooltip content={<CustomTooltip active label="test" payload={[]} />} />
                    <Bar dataKey="income" fill="#10b981" hide={!visibility.income} name="Income" />
                    <Bar dataKey="expenses" fill="#ef4444" hide={!visibility.expenses} name="Expenses" />
                    <Bar dataKey="balance" fill="#f59e0b" hide={!visibility.balance} name="Balance" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

type CustomTooltipProps = {
    active?: boolean
    label?: string
    payload?: any[]
}

const CustomTooltip = (props: CustomTooltipProps) => {
    const { active, label, payload } = props

    if (active && payload && payload.length && label) {
        const expenseData = payload.find((p: any) => p.dataKey === "expenses")
        const incomeData = payload.find((p: any) => p.dataKey === "income")
        const balanceData = payload.find((p: any) => p.dataKey === "balance")
        const entry = payload[0]?.payload || {}
        const recurringExpenses = entry.recurringExpensesTotal || 0
        const oneTimeExpenses = entry.oneTimeExpensesTotal || 0

        return (
            <div className="rounded border bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-black">{label}</p>

                <div className="flex flex-col gap-2">
                    {incomeData && (
                        <p className="text-sm text-green-500">Income: ${formatAmount(Number(incomeData.value))}</p>
                    )}

                    {expenseData && (
                        <div className="border-y text-xs">
                            <p className="text-sm text-red-500">Expenses: ${formatAmount(Number(expenseData.value))}</p>
                            <ul className="ml-2 list-disc pl-2">
                                <li className="text-black">Recurring: ${formatAmount(Number(recurringExpenses))}</li>
                                <li className="text-black">One-Time: ${formatAmount(Number(oneTimeExpenses))}</li>
                            </ul>
                        </div>
                    )}

                    {balanceData && (
                        <p className="text-sm text-blue-500">Balance: ${formatAmount(Number(balanceData.value))}</p>
                    )}
                </div>
            </div>
        )
    }

    return null
}
