import type { CategoryData } from "@/types/category-data"

import { useCallback } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import COLORS from "../utils/constants"
import formatAmount from "../../../../lib/financial-calculations/format-amount"

type TopSpendingCategoriesProps = {
    categoryData: CategoryData[]
}

export default function TopSpendingCategories(props: TopSpendingCategoriesProps) {
    const { categoryData } = props

    // Get top spending categories
    const getTopCategories = useCallback(() => {
        return categoryData.slice(0, 3)
    }, [categoryData])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Spending Categories</CardTitle>
                <CardDescription>Where Most Of Your Money Goes</CardDescription>
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
                            <span className="font-medium">${formatAmount(category.total)}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
