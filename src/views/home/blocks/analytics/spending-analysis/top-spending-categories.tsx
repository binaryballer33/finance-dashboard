import { useCallback } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import COLORS from "../utils/constants"

type TopSpendingCategoriesProps = {
    categoryTotals: { category: string; total: number }[]
}

export default function TopSpendingCategories(props: TopSpendingCategoriesProps) {
    const { categoryTotals } = props

    // Get top spending categories
    const getTopCategories = useCallback(() => {
        return categoryTotals.slice(0, 3)
    }, [categoryTotals])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Spending Categories</CardTitle>
                <CardDescription>Where most of your money goes</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {getTopCategories().map((category, index) => (
                        <div className="flex items-center justify-between" key={category.category}>
                            <div className="flex items-center gap-2">
                                <div
                                    className="h-4 w-4 rounded-full"
                                    style={{
                                        backgroundColor: COLORS[index % COLORS.length],
                                    }}
                                />
                                <span>{category.category}</span>
                            </div>
                            <span className="font-medium">${category.total.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
