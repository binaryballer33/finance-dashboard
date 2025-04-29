import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type SpendingInsightsProps = {
    monthlyData: { balance: number; expenses: number; income: number; name: string }[]
    totalExpenses: number
    totalIncome: number
}

export default function SpendingInsights(props: SpendingInsightsProps) {
    const { monthlyData, totalExpenses, totalIncome } = props

    return (
        <Card>
            <CardHeader>
                <CardTitle>Spending Insights</CardTitle>
                <CardDescription>Analysis Of Your Spending Habits</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {totalExpenses > 0 ? (
                        <>
                            <div>
                                <p className="text-sm text-muted-foreground">Average Daily Spending:</p>
                                <p className="text-lg font-medium">${(totalExpenses / 30).toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Biggest Expense Category:</p>
                                <p className="text-lg font-medium">{monthlyData[0]?.name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Percentage of Income Spent:</p>
                                <p className="text-lg font-medium">
                                    {totalIncome > 0 ? `${((totalExpenses / totalIncome) * 100).toFixed(0)}%` : "N/A"}
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-muted-foreground">Add Some Expenses To See Spending Insights</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
