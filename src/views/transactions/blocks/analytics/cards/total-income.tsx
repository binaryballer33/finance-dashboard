import { ArrowUpRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TotalIncomeProps = {
    calculateTotalIncome: () => number
}

export default function TotalIncome(props: TotalIncomeProps) {
    const { calculateTotalIncome } = props

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-500">${calculateTotalIncome().toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Total money coming in</p>
            </CardContent>
        </Card>
    )
}
