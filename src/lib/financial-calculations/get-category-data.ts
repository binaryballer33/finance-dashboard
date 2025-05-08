import type { CategoryData } from "@/types/category-data"
import type { Expense } from "@prisma/client"

import { categoryColors } from "@/mocks/categories"

import getTotal from "@/lib/data-aggregation/get-total"
import groupArrayOfObjectsByField from "@/lib/data-aggregation/group-array-of-objects-by-field"

export default function getCategoryData(expenses: Expense[]) {
    const totalExpenses = getTotal({ usingArray: expenses, usingField: "amount" })

    return groupArrayOfObjectsByField({ array: expenses, field: "category" }).map((category) => {
        const categoryTotal = getTotal({ usingArray: category.data, usingField: "amount" })
        const percentageOfCategory = Number(((categoryTotal / totalExpenses) * 100).toFixed(2))
        const transactions = category.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        return {
            category: category.group,
            color: categoryColors[category.group],
            monthlyTotalExpenses: totalExpenses,
            percentage: percentageOfCategory,
            total: categoryTotal,
            transactions,
        } satisfies CategoryData
    })
}
