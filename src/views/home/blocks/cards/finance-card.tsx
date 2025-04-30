import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import formatAmount from "../../../../lib/financial-calculations/format-amount"

type TotalIncomeProps = {
    amount: number
    subTitle?: string
    title: string
}

export default function FinanceCard(props: TotalIncomeProps) {
    const { amount, subTitle, title } = props

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>

                {amount > 0 && <ArrowUpRight className="h-4 w-4 text-green-500" />}
                {amount < 0 && <ArrowDownRight className="h-4 w-4 text-red-500" />}
            </CardHeader>

            <CardContent>
                <div className={`text-2xl font-bold ${getColor(amount)}`}>${formatAmount(amount)}</div>

                {subTitle && <p className="text-xs text-muted-foreground">{subTitle}</p>}
            </CardContent>
        </Card>
    )
}

function getColor(amount: number) {
    if (amount === 0) return "text-muted-foreground"
    if (amount > 0) return "text-green-500"
    return "text-red-500"
}
