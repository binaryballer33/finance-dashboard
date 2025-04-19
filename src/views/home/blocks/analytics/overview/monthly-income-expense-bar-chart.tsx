import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type MonthlyIncomeExpenseBarChartProps = {
    monthlyData: {
        balance: number
        expenses: number
        income: number
        name: string
        oneTimeExpensesTotal: number
        recurringExpensesTotal: number
    }[]
}

export default function MonthlyIncomeExpenseBarChart(props: MonthlyIncomeExpenseBarChartProps) {
    const { monthlyData } = props

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                <CardDescription>Income, Expenses, Transactions And Savings Balance Monthly Totals</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer height="100%" width="100%">
                    <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ReTooltip content={<CustomTooltip active label="test" payload={[]} />} />
                        <Legend />
                        <Bar dataKey="income" fill="#10b981" name="Income" />
                        <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                        <Bar dataKey="balance" fill="#f59e0b" name="Balance" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

type CustomTooltipProps = {
    active: boolean
    label: string
    payload: any[]
}

const CustomTooltip = (props: CustomTooltipProps) => {
    const { active, label, payload } = props

    if (active && payload && payload.length) {
        const expenseData = payload.find((p: any) => p.dataKey === "expenses")
        const incomeData = payload.find((p: any) => p.dataKey === "income")
        const balanceData = payload.find((p: any) => p.dataKey === "balance")
        const entry = payload[0]?.payload || {}
        const recurringExpenses = entry.recurringExpensesTotal || 0
        const oneTimeExpenses = entry.oneTimeExpensesTotal || 0

        return (
            <div className="rounded border bg-white p-4 shadow-sm">
                <p className="text-sm font-medium">{label}</p>

                <div className="flex flex-col gap-2">
                    <p className="text-sm text-green-500">Income: ${Number(incomeData.value).toFixed(2)}</p>

                    <div className="border-y text-xs">
                        <p className="text-sm text-red-500">Expenses: ${Number(expenseData.value).toFixed(2)}</p>
                        <ul className="ml-2 list-disc pl-2">
                            <li>Recurring: ${Number(recurringExpenses).toFixed(2)}</li>
                            <li>One-Time: ${Number(oneTimeExpenses).toFixed(2)}</li>
                        </ul>
                    </div>

                    <p className="text-sm text-blue-500">Balance: ${Number(balanceData.value).toFixed(2)}</p>
                </div>
            </div>
        )
    }

    return null
}
