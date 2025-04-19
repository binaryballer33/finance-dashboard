"use client"

import type { Expense, Income, Trade, Transaction } from "@prisma/client"

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
    transactions: Transaction[]
}

export default function Analytics(props: AnalyticsProps) {
    const { expenses, incomes, trades, transactions } = props

    const [dateRange, setDateRange] = useState<DateRange>("1m")

    const getTotalTransactions = useCallback(() => {
        return getTotal({ usingArray: transactions, usingDateRange: dateRange, usingField: "amount" })
    }, [transactions, dateRange])

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
        const filteredTransactions =
            dateRange && dateRange !== "all" ? getFilteredArray(transactions, dateRange) : transactions

        return groupArrayOfObjectsByField({ array: filteredTransactions, field: "category" }).map((category) => {
            return {
                category: category.group,
                total: category.data.reduce((acc, item) => acc + item.amount, 0),
            }
        })
    }, [transactions, dateRange])

    const monthlyData = useCallback(
        () => getMonthlyData(incomes, expenses, transactions, dateRange),
        [incomes, expenses, transactions, dateRange],
    )

    return (
        <div className="} min-h-screen bg-background">
            <div className="container mx-auto space-y-4 px-4 py-6 md:px-6">
                <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />

                <div className="mb-6 grid gap-6 overflow-x-auto md:grid-cols-4">
                    <FinanceCard amount={getTotalIncome()} subTitle="Total Money Coming In" title="Total Income" />

                    <FinanceCard amount={getTotalTrades()} subTitle="Total Trades Outcome" title="Total Trades" />

                    <FinanceCard
                        amount={-(getTotalExpenses() + getTotalTransactions())}
                        subTitle="Total Recurring Expenses And Transactions"
                        title="Total Expenses"
                    />

                    <FinanceCard
                        amount={getTotalIncome() - getTotalExpenses() - getTotalTransactions()}
                        subTitle="Current Financial Savings Balance"
                        title="Total Savings"
                    />
                </div>

                <Tabs className="space-y-4" defaultValue="overview">
                    <TabsList className="grid grid-cols-3 md:inline-flex md:w-auto">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="spending">Spending</TabsTrigger>
                        <TabsTrigger value="budget">Budget</TabsTrigger>
                        <TabsTrigger value="trends">Trends</TabsTrigger>
                    </TabsList>

                    <TabsContent className="space-y-4" value="overview">
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                            <MonthlyIncomeExpenseBarChart monthlyData={monthlyData()} />
                            <ExpenseBreakdownPieChart
                                categoryTotals={getCategoryTotals()}
                                dateRange={dateRange}
                                expenses={expenses}
                                transactions={transactions}
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
                        <DailySpendingChart
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                            transactions={transactions}
                        />

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
                            filteredTransactions={transactions as any}
                            transactions={transactions as any}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
