"use client"

import type { Expense, Income, Trade } from "@prisma/client"

import { useCallback, useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import TabbedIncomeExpenseCharts from "@/components/charts/tabbed-income-expense-charts"

import type { DateRange } from "./utils/types"

import BudgetHealth from "./budget/budget-health"
import FinanceCard from "./cards/finance-card"
import DateRangeSelector from "./common/date-range-selector"
import ExpenseBreakdownPieChart from "./overview/expense-breakdown-pie-chart"
import MonthlyIncomeExpenseBarChart from "./overview/monthly-income-expense-bar-chart"
import SpendingSummary from "./overview/spending-summary"
import DailySpendingChart from "./spending-analysis/daily-spending-chart"
import SpendingInsights from "./spending-analysis/spending-insights"
import TopSpendingCategories from "./spending-analysis/top-spending-categories"
import MonthlySavingsBalance from "./trend/monthly-savings-balance"
import getFilteredArray from "./utils/get-filtered-array-by-date-range"
import getMonthlyData from "./utils/get-monthly-data"
import getTotal from "./utils/get-total"
import groupArrayOfObjectsByField from "./utils/group-array-of-objects-by-field"

type AnalyticsProps = {
    expenses: Expense[]
    incomes: Income[]
    trades: Trade[]
}

export default function Analytics(props: AnalyticsProps) {
    const { expenses, incomes, trades } = props

    const [dateRange, setDateRange] = useState<DateRange>("1m")

    const getTotalExpenses = useCallback(() => {
        return getTotal({ usingArray: expenses, usingDateRange: dateRange, usingField: "amount" })
    }, [expenses, dateRange])

    const getTotalIncome = useCallback(() => {
        return getTotal({ usingArray: incomes, usingDateRange: dateRange, usingField: "amount" })
    }, [incomes, dateRange])

    const getTotalTrades = useCallback(() => {
        return getTotal({ usingArray: trades, usingDateRange: dateRange, usingField: "profitLoss" })
    }, [trades, dateRange])

    const getCategoryTotals = useCallback(() => {
        const filteredExpenses = dateRange && dateRange !== "all" ? getFilteredArray(expenses, dateRange) : expenses

        return groupArrayOfObjectsByField({ array: filteredExpenses, field: "category" }).map((category) => {
            return {
                category: category.group,
                total: category.data.reduce((acc, item) => acc + item.amount, 0),
            }
        })
    }, [expenses, dateRange])

    const recurringExpenses = useCallback(() => {
        return getTotal({
            usingArray: expenses.filter((e) => e.type === "RECURRING"),
            usingDateRange: dateRange,
            usingField: "amount",
        })
    }, [expenses, dateRange])

    const oneTimeExpenses = useCallback(() => {
        return getTotal({
            usingArray: expenses.filter((e) => e.type === "ONE_TIME"),
            usingDateRange: dateRange,
            usingField: "amount",
        })
    }, [expenses, dateRange])

    const monthlyData = useCallback(() => getMonthlyData(incomes, expenses, dateRange), [incomes, expenses, dateRange])

    return (
        <div className="} min-h-screen bg-background">
            <div className="container mx-auto space-y-4 px-4 py-6 md:px-6">
                <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />

                <div className="mb-6 grid gap-6 overflow-x-auto md:grid-cols-4">
                    <FinanceCard amount={getTotalIncome()} subTitle="Total Money Coming In" title="Total Income" />

                    <FinanceCard amount={getTotalTrades()} subTitle="Total Trades Outcome" title="Total Trades" />

                    <FinanceCard
                        amount={-getTotalExpenses()}
                        subTitle="Total Recurring Expenses And Transactions"
                        title="Total Expenses"
                    />

                    <FinanceCard
                        amount={getTotalIncome() - getTotalExpenses()}
                        subTitle="Current Financial Savings Balance"
                        title="Total Savings"
                    />
                </div>

                <Tabs className="space-y-4" defaultValue="overview">
                    <TabsList className="grid grid-cols-4 overflow-x-auto md:flex md:w-auto md:justify-start">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="spending">Spending</TabsTrigger>
                        <TabsTrigger value="budget">Budget</TabsTrigger>
                        <TabsTrigger value="trends">Trends</TabsTrigger>
                    </TabsList>

                    <TabsContent className="space-y-4" value="overview">
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                            <MonthlyIncomeExpenseBarChart
                                monthlyData={monthlyData()}
                                oneTimeExpenses={oneTimeExpenses()}
                                recurringExpenses={recurringExpenses()}
                            />
                            <ExpenseBreakdownPieChart
                                categoryTotals={getCategoryTotals()}
                                dateRange={dateRange}
                                expenses={expenses}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                            <SpendingSummary
                                calculateTotalExpenses={getTotalExpenses}
                                categoryTotals={getCategoryTotals()}
                            />

                            <TabbedIncomeExpenseCharts monthlyData={monthlyData()} />
                        </div>
                    </TabsContent>

                    <TabsContent className="space-y-4" value="spending">
                        <DailySpendingChart dateRange={dateRange} expenses={expenses} setDateRange={setDateRange} />

                        <div className="grid gap-4 md:grid-cols-2">
                            <TopSpendingCategories categoryTotals={getCategoryTotals()} />

                            <SpendingInsights
                                calculateTotalExpenses={getTotalExpenses}
                                calculateTotalIncome={getTotalIncome}
                                monthlyData={monthlyData()}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="trends">
                        <MonthlySavingsBalance monthlyData={monthlyData()} />
                    </TabsContent>

                    <TabsContent value="budget">
                        <BudgetHealth
                            calculateTotalExpenses={getTotalExpenses}
                            calculateTotalIncome={getTotalIncome}
                            expenses={expenses}
                            filteredExpenses={expenses}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
