"use client"

import type { DateRange } from "@/types/date-range"
import type { Expense, Income, Trade } from "@prisma/client"

import { useCallback, useMemo, useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import TabbedIncomeExpenseCharts from "@/views/home/blocks/analytics/overview/tabbed-income-expense-charts"

import BudgetHealth from "./budget/budget-health"
import FinanceCard from "./cards/finance-card"
import DateRangeSelector from "./common/date-range-selector"
import ExpenseCategoryPieChart from "./overview/expense-category-pie-chart"
import DailySpendingChart from "./spending-analysis/daily-spending-chart"
import SpendingInsights from "./spending-analysis/spending-insights"
import TopSpendingCategories from "./spending-analysis/top-spending-categories"
import MonthlySavingsBalance from "./trend/monthly-savings-balance"
import getCategoryData from "./utils/get-category-data"
import getFilteredArray from "./utils/get-filtered-array-by-date-range"
import getMonthlyData from "./utils/get-monthly-data"
import getTotal from "./utils/get-total"

type AnalyticsProps = {
    expenses: Expense[]
    incomes: Income[]
    trades: Trade[]
}

export default function Analytics(props: AnalyticsProps) {
    const { expenses: initialExpenses, incomes: initialIncomes, trades: initialTrades } = props

    const [dateRange, setDateRange] = useState<DateRange>("1m")

    // memoize the filtered expenses and incomes values based on the date range to prevent unnecessary recalculations
    const expenses = useMemo(() => {
        return dateRange !== "all" ? getFilteredArray(initialExpenses, dateRange) : initialExpenses
    }, [initialExpenses, dateRange])

    const incomes = useMemo(() => {
        return dateRange !== "all" ? getFilteredArray(initialIncomes, dateRange) : initialIncomes
    }, [initialIncomes, dateRange])

    const trades = useMemo(() => {
        return dateRange !== "all" ? getFilteredArray(initialTrades, dateRange) : initialTrades
    }, [initialTrades, dateRange])

    // memoize the total expenses, income, and trades functions to prevent unnecessary recalculations
    const getTotalExpenses = useCallback(() => {
        return getTotal({ usingArray: expenses, usingField: "amount" })
    }, [expenses])

    const getTotalIncome = useCallback(() => {
        return getTotal({ usingArray: incomes, usingField: "amount" })
    }, [incomes])

    const getTotalTrades = useCallback(() => {
        return getTotal({ usingArray: trades, usingField: "profitLoss" })
    }, [trades])

    const categoryData = useCallback(() => getCategoryData(expenses), [expenses])

    const monthlyData = useCallback(() => getMonthlyData(incomes, expenses), [incomes, expenses])

    return (
        <div className="min-h-screen bg-background">
            <div className="sticky top-0 z-10 border-b bg-background pb-2 pt-4">
                <div className="container mx-auto px-4 md:px-6">
                    <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
                </div>
            </div>
            <div className="container mx-auto space-y-4 px-4 py-6 md:px-6">
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
                            <div className="flex flex-col gap-4">
                                <TabbedIncomeExpenseCharts monthlyData={monthlyData()} />
                                <p className="mt-16 h-[300px] text-center"> Place Holder Component</p>
                            </div>

                            <ExpenseCategoryPieChart
                                categoryData={categoryData()}
                                dateRange={dateRange}
                                expenses={expenses}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent className="space-y-4" value="spending">
                        <DailySpendingChart dateRange={dateRange} expenses={expenses} />

                        <div className="grid gap-4 md:grid-cols-2">
                            <TopSpendingCategories categoryData={categoryData()} />

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
