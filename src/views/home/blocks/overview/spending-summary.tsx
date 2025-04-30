import type { CategoryData } from "@/types/category-data"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import COLORS from "../utils/constants"
import formatAmount from "../../../../lib/financial-calculations/format-amount"

type SpendingSummaryProps = {
    calculateTotalExpenses: () => number
    categoryData: CategoryData[]
}

export default function SpendingSummary(props: SpendingSummaryProps) {
    const { calculateTotalExpenses, categoryData } = props

    const width = (total: number) => ((total / calculateTotalExpenses()) * 100).toFixed(0)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Spending Summary</CardTitle>
                <CardDescription>Breakdown Of Your Expenses By Category</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {categoryData.map((category, index) => (
                        <div className="flex items-center" key={category.category}>
                            <div className="w-full">
                                <div className="mb-1 flex justify-between">
                                    <span className="flex items-center gap-1 text-sm font-medium">
                                        {category.category}
                                    </span>
                                    <span className="text-sm font-medium">${formatAmount(category.total)}</span>
                                </div>
                                <div className="h-2.5 w-full rounded-full bg-muted">
                                    <div
                                        aria-label={`${category.category}: ${width(category.total)}%`}
                                        className="h-2.5 rounded-full"
                                        style={{
                                            backgroundColor: COLORS[index % COLORS.length],
                                            width: `${width(category.total)}%`,
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
