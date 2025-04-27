import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type SpendingInsightsProps = {
    calculateTotalExpenses: () => number
    calculateTotalIncome: () => number
    monthlyData: { balance: number; expenses: number; income: number; name: string }[]
}

export default function SpendingInsights(props: SpendingInsightsProps) {
    const { calculateTotalExpenses, calculateTotalIncome, monthlyData } = props

    return (
        <Card>
            <CardHeader>
                <CardTitle>Spending Insights</CardTitle>
                <CardDescription>Analysis of your spending habits</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {calculateTotalExpenses() > 0 ? (
                        <>
                            <div>
                                <p className="text-sm text-muted-foreground">Average daily spending:</p>
                                <p className="text-lg font-medium">${(calculateTotalExpenses() / 30).toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Biggest expense category:</p>
                                <p className="text-lg font-medium">{monthlyData[0]?.name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Percentage of income spent:</p>
                                <p className="text-lg font-medium">
                                    {calculateTotalIncome() > 0
                                        ? `${((calculateTotalExpenses() / calculateTotalIncome()) * 100).toFixed(0)}%`
                                        : "N/A"}
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-muted-foreground">Add some expenses to see spending insights</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
