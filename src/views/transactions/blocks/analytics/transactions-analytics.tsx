"use client"

import { useCallback, useEffect, useState } from "react"

import { BookOpen, Coffee, DollarSign, Home, Plus, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import BudgetHealth from "./budget/budget-health"
import Savings from "./cards/savings"
import TotalExpense from "./cards/total-expense"
import TotalIncome from "./cards/total-income"
import ExpenseBreakdownBarChart from "./overview/expense-breakdown-bar-chart"
import MonthlyIncomeExpenseBarChart from "./overview/monthly-income-expense-bar-chart"
import SpendingSummary from "./overview/spending-summary"
import DailySpendingChart from "./spending-analysis/daily-spending-chart"
import SpendingInsights from "./spending-analysis/spending-insights"
import TopSpendingCategories from "./spending-analysis/top-spending-categories"
import TransactionsTable from "./transactions/table"
import MonthlySavingsBalance from "./trend/monthly-savings-balance"
import getBalance from "./utils/get-balance"
import getCategoryData from "./utils/get-category-data"
import getMonthlyData from "./utils/get-monthly-data"
import getTotalExpenses from "./utils/get-total-expenses"
import getTotalIncome from "./utils/get-total-income"

// Define transaction type
type Transaction = {
    amount: number
    category: string
    date: string
    description: string
    id: string
    type: "expense" | "income"
}

// Define category options with icons
const incomeCategories = [
    { icon: <DollarSign className="h-4 w-4" />, name: "Salary" },
    { icon: <DollarSign className="h-4 w-4" />, name: "Allowance" },
    { icon: <DollarSign className="h-4 w-4" />, name: "Gift" },
    { icon: <BookOpen className="h-4 w-4" />, name: "Scholarship" },
    { icon: <DollarSign className="h-4 w-4" />, name: "Part-time Job" },
    { icon: <DollarSign className="h-4 w-4" />, name: "Financial Aid" },
    { icon: <DollarSign className="h-4 w-4" />, name: "Other" },
]

const expenseCategories = [
    { icon: <Coffee className="h-4 w-4" />, name: "Food" },
    { icon: <Home className="h-4 w-4" />, name: "Housing" },
    { icon: <DollarSign className="h-4 w-4" />, name: "Transportation" },
    { icon: <DollarSign className="h-4 w-4" />, name: "Entertainment" },
    { icon: <BookOpen className="h-4 w-4" />, name: "Education" },
    { icon: <BookOpen className="h-4 w-4" />, name: "Textbooks" },
    { icon: <DollarSign className="h-4 w-4" />, name: "School Supplies" },
    { icon: <BookOpen className="h-4 w-4" />, name: "Tuition" },
    { icon: <ShoppingBag className="h-4 w-4" />, name: "Shopping" },
    { icon: <DollarSign className="h-4 w-4" />, name: "Utilities" },
    { icon: <DollarSign className="h-4 w-4" />, name: "Health" },
    { icon: <DollarSign className="h-4 w-4" />, name: "Subscriptions" },
    { icon: <Coffee className="h-4 w-4" />, name: "Coffee" },
    { icon: <DollarSign className="h-4 w-4" />, name: "Dining Out" },
    { icon: <ShoppingBag className="h-4 w-4" />, name: "Groceries" },
    { icon: <DollarSign className="h-4 w-4" />, name: "Other" },
]

export default function TransactionsAnalytics() {
    // State for transactions
    const [transactions, setTransactions] = useState<Transaction[]>([])

    // State for form
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [currentTransaction, setCurrentTransaction] = useState<null | Transaction>(null)
    const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>({
        amount: 0,
        category: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
        type: "expense",
    })

    // State for analytics view
    const [analyticsView, setAnalyticsView] = useState<"budget" | "overview" | "spending" | "trends">("overview")

    // State to track if data is loading
    const [isLoading, setIsLoading] = useState(true)

    // Load transactions from localStorage on component mount
    useEffect(() => {
        setIsLoading(true)
        const savedTransactions = localStorage.getItem("transactions")
        if (savedTransactions) {
            try {
                const parsed = JSON.parse(savedTransactions)
                setTransactions(parsed)
            } catch (e) {
                console.error("Error parsing saved transactions:", e)
                setTransactions([])
            }
        }
        setIsLoading(false)
    }, [])

    // Save transactions to localStorage whenever they change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("transactions", JSON.stringify(transactions))
        }
    }, [transactions, isLoading])

    // Calculate balance
    const calculateBalance = useCallback(() => {
        return getBalance(transactions)
    }, [transactions])

    const calculateTotalIncome = useCallback(() => {
        return getTotalIncome(transactions)
    }, [transactions])

    const calculateTotalExpenses = useCallback(() => {
        return getTotalExpenses(transactions)
    }, [transactions])

    // Add new transaction
    const addTransaction = () => {
        // Validate form
        if (!newTransaction.category || !newTransaction.description || newTransaction.amount <= 0) {
            alert("Please fill in all fields with valid values")
            return
        }

        const transaction: Transaction = {
            ...newTransaction,
            id: Date.now().toString(),
        }

        setTransactions((prev) => [transaction, ...prev])
        setNewTransaction({
            amount: 0,
            category: "",
            date: new Date().toISOString().split("T")[0],
            description: "",
            type: "expense",
        })
        setIsAddDialogOpen(false)
    }

    // Edit transaction
    const startEditTransaction = (transaction: Transaction) => {
        setCurrentTransaction(transaction)
        setNewTransaction({
            amount: transaction.amount,
            category: transaction.category,
            date: transaction.date,
            description: transaction.description,
            type: transaction.type,
        })
        setIsEditDialogOpen(true)
    }

    // Update transaction
    const updateTransaction = () => {
        if (!currentTransaction) return

        // Validate form
        if (!newTransaction.category || !newTransaction.description || newTransaction.amount <= 0) {
            alert("Please fill in all fields with valid values")
            return
        }

        setTransactions((prev) =>
            prev.map((t) => (t.id === currentTransaction.id ? { ...newTransaction, id: currentTransaction.id } : t)),
        )

        setIsEditDialogOpen(false)
        setCurrentTransaction(null)
    }

    // Delete transaction
    const deleteTransaction = (id: string) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id))
    }

    // Prepare data for category chart
    const prepareCategoryData = useCallback(() => {
        return getCategoryData(transactions)
    }, [transactions])

    // Prepare data for monthly chart
    const prepareMonthlyData = useCallback(() => {
        return getMonthlyData(transactions)
    }, [transactions])

    // Get category icon
    const getCategoryIcon = (category: string, type: "expense" | "income") => {
        if (type === "income") {
            const found = incomeCategories.find((c) => c.name === category)
            return found ? found.icon : <DollarSign className="h-4 w-4" />
        }
        const found = expenseCategories.find((c) => c.name === category)
        return found ? found.icon : <DollarSign className="h-4 w-4" />
    }

    return (
        <div className="} min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 md:px-6">
                <header className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Student Finance Tracker</h1>
                        <p className="text-muted-foreground">
                            Take control of your finances while focusing on your studies
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Dialog onOpenChange={setIsAddDialogOpen} open={isAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Transaction
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Transaction</DialogTitle>
                                    <DialogDescription>Enter the details of your transaction below.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="transaction-type">Type</Label>
                                            <Select
                                                onValueChange={(value: "expense" | "income") =>
                                                    setNewTransaction({ ...newTransaction, type: value })
                                                }
                                                value={newTransaction.type}
                                            >
                                                <SelectTrigger id="transaction-type">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="income">Income</SelectItem>
                                                    <SelectItem value="expense">Expense</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="transaction-amount">Amount</Label>
                                            <Input
                                                id="transaction-amount"
                                                min="0.01"
                                                onChange={(e) =>
                                                    setNewTransaction({
                                                        ...newTransaction,
                                                        amount: Number.parseFloat(e.target.value) || 0,
                                                    })
                                                }
                                                step="0.01"
                                                type="number"
                                                value={newTransaction.amount || ""}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="transaction-category">Category</Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setNewTransaction({ ...newTransaction, category: value })
                                            }
                                            value={newTransaction.category}
                                        >
                                            <SelectTrigger id="transaction-category">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {newTransaction.type === "income"
                                                    ? incomeCategories.map((cat) => (
                                                          <SelectItem key={cat.name} value={cat.name}>
                                                              <div className="flex items-center">
                                                                  {cat.icon}
                                                                  <span className="ml-2">{cat.name}</span>
                                                              </div>
                                                          </SelectItem>
                                                      ))
                                                    : expenseCategories.map((cat) => (
                                                          <SelectItem key={cat.name} value={cat.name}>
                                                              <div className="flex items-center">
                                                                  {cat.icon}
                                                                  <span className="ml-2">{cat.name}</span>
                                                              </div>
                                                          </SelectItem>
                                                      ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="transaction-description">Description</Label>
                                        <Input
                                            id="transaction-description"
                                            onChange={(e) =>
                                                setNewTransaction({ ...newTransaction, description: e.target.value })
                                            }
                                            value={newTransaction.description}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="transaction-date">Date</Label>
                                        <Input
                                            id="transaction-date"
                                            onChange={(e) =>
                                                setNewTransaction({ ...newTransaction, date: e.target.value })
                                            }
                                            type="date"
                                            value={newTransaction.date}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={() => setIsAddDialogOpen(false)} variant="outline">
                                        Cancel
                                    </Button>
                                    <Button onClick={addTransaction}>Add Transaction</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog onOpenChange={setIsEditDialogOpen} open={isEditDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Transaction</DialogTitle>
                                    <DialogDescription>Update the details of your transaction.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="edit-transaction-type">Type</Label>
                                            <Select
                                                onValueChange={(value: "expense" | "income") =>
                                                    setNewTransaction({ ...newTransaction, type: value })
                                                }
                                                value={newTransaction.type}
                                            >
                                                <SelectTrigger id="edit-transaction-type">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="income">Income</SelectItem>
                                                    <SelectItem value="expense">Expense</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="edit-transaction-amount">Amount</Label>
                                            <Input
                                                id="edit-transaction-amount"
                                                min="0.01"
                                                onChange={(e) =>
                                                    setNewTransaction({
                                                        ...newTransaction,
                                                        amount: Number.parseFloat(e.target.value) || 0,
                                                    })
                                                }
                                                step="0.01"
                                                type="number"
                                                value={newTransaction.amount || ""}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="edit-transaction-category">Category</Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setNewTransaction({ ...newTransaction, category: value })
                                            }
                                            value={newTransaction.category}
                                        >
                                            <SelectTrigger id="edit-transaction-category">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {newTransaction.type === "income"
                                                    ? incomeCategories.map((cat) => (
                                                          <SelectItem key={cat.name} value={cat.name}>
                                                              <div className="flex items-center">
                                                                  {cat.icon}
                                                                  <span className="ml-2">{cat.name}</span>
                                                              </div>
                                                          </SelectItem>
                                                      ))
                                                    : expenseCategories.map((cat) => (
                                                          <SelectItem key={cat.name} value={cat.name}>
                                                              <div className="flex items-center">
                                                                  {cat.icon}
                                                                  <span className="ml-2">{cat.name}</span>
                                                              </div>
                                                          </SelectItem>
                                                      ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="edit-transaction-description">Description</Label>
                                        <Input
                                            id="edit-transaction-description"
                                            onChange={(e) =>
                                                setNewTransaction({ ...newTransaction, description: e.target.value })
                                            }
                                            value={newTransaction.description}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="edit-transaction-date">Date</Label>
                                        <Input
                                            id="edit-transaction-date"
                                            onChange={(e) =>
                                                setNewTransaction({ ...newTransaction, date: e.target.value })
                                            }
                                            type="date"
                                            value={newTransaction.date}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={() => setIsEditDialogOpen(false)} variant="outline">
                                        Cancel
                                    </Button>
                                    <Button onClick={updateTransaction}>Update Transaction</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </header>

                <div className="mb-6 grid gap-6 md:grid-cols-3">
                    <Savings calculateBalance={calculateBalance} />
                    <TotalIncome calculateTotalIncome={calculateTotalIncome} />
                    <TotalExpense calculateTotalExpenses={calculateTotalExpenses} />
                </div>

                <Tabs className="space-y-4" defaultValue="analytics">
                    <TabsList className="grid grid-cols-3 md:inline-flex md:w-auto">
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    <TabsContent className="space-y-4" value="transactions">
                        <TransactionsTable
                            deleteTransaction={deleteTransaction}
                            filteredTransactions={transactions}
                            getCategoryIcon={getCategoryIcon}
                            isLoading={isLoading}
                            setIsAddDialogOpen={setIsAddDialogOpen}
                            startEditTransaction={startEditTransaction}
                        />
                    </TabsContent>

                    <TabsContent className="space-y-4" value="analytics">
                        <div className="mb-4 flex flex-wrap gap-2">
                            <Button
                                onClick={() => setAnalyticsView("overview")}
                                variant={analyticsView === "overview" ? "default" : "outline"}
                            >
                                Overview
                            </Button>
                            <Button
                                onClick={() => setAnalyticsView("spending")}
                                variant={analyticsView === "spending" ? "default" : "outline"}
                            >
                                Spending Analysis
                            </Button>
                            <Button
                                onClick={() => setAnalyticsView("trends")}
                                variant={analyticsView === "trends" ? "default" : "outline"}
                            >
                                Trends
                            </Button>
                            <Button
                                onClick={() => setAnalyticsView("budget")}
                                variant={analyticsView === "budget" ? "default" : "outline"}
                            >
                                Budget Health
                            </Button>
                        </div>

                        {analyticsView === "overview" && (
                            <>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <MonthlyIncomeExpenseBarChart prepareMonthlyData={prepareMonthlyData} />
                                    <ExpenseBreakdownBarChart prepareCategoryData={prepareCategoryData} />
                                </div>
                                <SpendingSummary
                                    calculateTotalExpenses={calculateTotalExpenses}
                                    getCategoryIcon={getCategoryIcon}
                                    prepareCategoryData={prepareCategoryData}
                                />
                            </>
                        )}

                        {analyticsView === "spending" && (
                            <>
                                <DailySpendingChart transactions={transactions} />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <TopSpendingCategories prepareCategoryData={prepareCategoryData} />

                                    <SpendingInsights
                                        calculateTotalExpenses={calculateTotalExpenses}
                                        calculateTotalIncome={calculateTotalIncome}
                                        prepareCategoryData={prepareCategoryData}
                                    />
                                </div>
                            </>
                        )}

                        {analyticsView === "trends" && (
                            <MonthlySavingsBalance prepareMonthlyData={prepareMonthlyData} />
                        )}

                        {analyticsView === "budget" && (
                            <BudgetHealth
                                calculateTotalExpenses={calculateTotalExpenses}
                                calculateTotalIncome={calculateTotalIncome}
                                filteredTransactions={transactions}
                                transactions={transactions}
                            />
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
