"use client"

import type { DateRange } from "@/types/date-range"
import type { ExtendedUser } from "@/types/types.d/next-auth-types"

import { useMemo, useState } from "react"

import useGetExpensesByUserIdInfiniteQuery from "@/api/expenses/queries/use-get-expenses-by-userId-infinite-query"
import useGetIncomeByUserIdQuery from "@/api/incomes/queries/use-get-income-by-userId"
import useGetTradesByUserIdQuery from "@/api/trades/queries/use-get-trades-by-userId"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ExpensesTable from "@/views/expenses/blocks/expenses-table"
import BudgetHealth from "@/views/home/blocks/budget/budget-health"
import FinanceCard from "@/views/home/blocks/cards/finance-card"
import DateRangeSelector from "@/views/home/blocks/common/date-range-selector"
import ExpenseCategoryPieChart from "@/views/home/blocks/overview/expense-category-pie-chart"
import TabbedIncomeExpenseCharts from "@/views/home/blocks/overview/tabbed-income-expense-charts"
import DailySpendingChart from "@/views/home/blocks/spending-analysis/daily-spending-chart"
import SpendingInsights from "@/views/home/blocks/spending-analysis/spending-insights"
import TopSpendingCategories from "@/views/home/blocks/spending-analysis/top-spending-categories"
import getCategoryData from "@/views/home/blocks/utils/get-category-data"
import getFilteredArray from "@/views/home/blocks/utils/get-filtered-array-by-date-range"
import getMonthlyData from "@/views/home/blocks/utils/get-monthly-data"
import getTotal from "@/views/home/blocks/utils/get-total"
import IncomeTable from "@/views/income/blocks/income-table"
import TradeTable from "@/views/investments/blocks/trade-table"

import Container from "@/components/base/container"

type HomeViewProps = {
    user: ExtendedUser
}

export default function HomeView(props: HomeViewProps) {
    const { user } = props

    const { data: initialIncomes = [] } = useGetIncomeByUserIdQuery(user.id)
    const { data: initialTrades = [] } = useGetTradesByUserIdQuery(user.id)
    const infiniteQuery = useGetExpensesByUserIdInfiniteQuery(user.id)
    const initialExpenses = useMemo(() => infiniteQuery.data?.pages.flatMap((page) => page) ?? [], [infiniteQuery.data])

    const [dateRange, setDateRange] = useState<DateRange>("1m")

    const expenses = useMemo(() => {
        return dateRange !== "all" ? getFilteredArray(initialExpenses, dateRange) : initialExpenses
    }, [initialExpenses, dateRange])

    const incomes = useMemo(() => {
        return dateRange !== "all" ? getFilteredArray(initialIncomes, dateRange) : initialIncomes
    }, [initialIncomes, dateRange])

    const trades = useMemo(() => {
        return dateRange !== "all" ? getFilteredArray(initialTrades, dateRange) : initialTrades
    }, [initialTrades, dateRange])

    const totalIncome = useMemo(() => getTotal({ usingArray: incomes, usingField: "amount" }), [incomes])
    const totalTrades = useMemo(() => getTotal({ usingArray: trades, usingField: "profitLoss" }), [trades])
    const totalExpenses = useMemo(() => getTotal({ usingArray: expenses, usingField: "amount" }), [expenses])
    const memoizedCategoryData = useMemo(() => getCategoryData(expenses), [expenses])
    const memoizedMonthlyData = useMemo(() => getMonthlyData(incomes, expenses), [incomes, expenses])

    return (
        <Container maxWidth="xl">
            <div className="min-h-screen bg-background">
                <div className="sticky top-0 z-10 border-b bg-background pb-2 pt-4">
                    <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
                </div>

                <div className="mx-auto space-y-4 py-6">
                    <div className="mb-6 grid gap-6 overflow-x-auto md:grid-cols-4">
                        <FinanceCard amount={totalIncome} subTitle="Total Money Coming In" title="Total Income" />

                        <FinanceCard amount={totalTrades} subTitle="Total Trades Outcome" title="Total Trades" />

                        <FinanceCard amount={-totalExpenses} subTitle="All Expenses" title="Total Expenses" />

                        <FinanceCard
                            amount={totalIncome - totalExpenses}
                            subTitle="Current Financial Savings Balance"
                            title="Total Savings"
                        />
                    </div>

                    <Tabs className="space-y-4" defaultValue="overview">
                        <TabsList className="grid grid-cols-4 overflow-x-auto md:flex md:w-auto md:justify-start">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="spending">Spending</TabsTrigger>
                            <TabsTrigger value="budget">Budget</TabsTrigger>
                            <TabsTrigger value="tables">Tables</TabsTrigger>
                        </TabsList>

                        <TabsContent className="space-y-4" value="overview">
                            <DailySpendingChart dateRange={dateRange} expenses={expenses} />

                            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                                <div className="flex h-full flex-col gap-4">
                                    <BudgetHealth
                                        expenses={expenses}
                                        totalExpenses={totalExpenses}
                                        totalIncome={totalIncome}
                                    />

                                    <TabbedIncomeExpenseCharts monthlyData={memoizedMonthlyData} />
                                </div>

                                <ExpenseCategoryPieChart
                                    categoryData={memoizedCategoryData}
                                    dateRange={dateRange}
                                    expenses={expenses}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent className="space-y-4" value="spending">
                            <DailySpendingChart dateRange={dateRange} expenses={expenses} />

                            <div className="grid gap-4 md:grid-cols-2">
                                <TopSpendingCategories categoryData={memoizedCategoryData} />

                                <SpendingInsights
                                    monthlyData={memoizedMonthlyData}
                                    totalExpenses={totalExpenses}
                                    totalIncome={totalIncome}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="budget">
                            <BudgetHealth expenses={expenses} totalExpenses={totalExpenses} totalIncome={totalIncome} />
                        </TabsContent>

                        <TabsContent value="tables">
                            <Tabs className="w-full" defaultValue="incomes">
                                <TabsList className="grid w-full grid-cols-3 border">
                                    <TabsTrigger value="incomes">Incomes</TabsTrigger>
                                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                                    <TabsTrigger value="trades">Trades</TabsTrigger>
                                </TabsList>

                                <TabsContent value="incomes">
                                    <IncomeTable incomes={incomes} userId={user.id} />
                                </TabsContent>

                                <TabsContent value="expenses">
                                    <ExpensesTable infiniteQuery={infiniteQuery} userId={user.id} />
                                </TabsContent>

                                <TabsContent value="trades">
                                    <TradeTable trades={trades} userId={user.id} />
                                </TabsContent>
                            </Tabs>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </Container>
    )
}
