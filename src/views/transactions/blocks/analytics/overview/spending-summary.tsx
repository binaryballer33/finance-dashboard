import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { COLORS } from "../utils/constants"

type SpendingSummaryProps = {
    calculateTotalExpenses: () => number
    getCategoryIcon: (name: string, type: "expense" | "income") => React.ReactNode
    prepareCategoryData: () => { name: string; value: number }[]
}

export default function SpendingSummary(props: SpendingSummaryProps) {
    const { calculateTotalExpenses, getCategoryIcon, prepareCategoryData } = props

    return (
        <Card>
            <CardHeader>
                <CardTitle>Spending Summary</CardTitle>
                <CardDescription>Breakdown of your expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {prepareCategoryData().map((category, index) => (
                        <div className="flex items-center" key={category.name}>
                            <div className="w-full">
                                <div className="mb-1 flex justify-between">
                                    <span className="flex items-center gap-1 text-sm font-medium">
                                        {getCategoryIcon(category.name, "expense")}
                                        {category.name}
                                    </span>
                                    <span className="text-sm font-medium">${category.value.toFixed(2)}</span>
                                </div>
                                <div className="h-2.5 w-full rounded-full bg-muted">
                                    <div
                                        aria-label={`${category.name}: ${((category.value / calculateTotalExpenses()) * 100).toFixed(0)}%`}
                                        className="h-2.5 rounded-full"
                                        style={{
                                            backgroundColor: COLORS[index % COLORS.length],
                                            width: `${((category.value / calculateTotalExpenses()) * 100).toFixed(0)}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
