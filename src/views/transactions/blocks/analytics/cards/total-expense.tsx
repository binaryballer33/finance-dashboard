import { ArrowDownRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TotalExpenseProps = {
    calculateTotalExpenses: () => number
}

export default function TotalExpense(props: TotalExpenseProps) {
    const { calculateTotalExpenses } = props

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-red-500">${calculateTotalExpenses().toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Total money going out</p>
            </CardContent>
        </Card>
    )
}
