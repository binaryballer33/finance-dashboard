import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type SavingProps = {
    calculateBalance: () => number
}

export default function Savings(props: SavingProps) {
    const { calculateBalance } = props

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${calculateBalance() >= 0 ? "text-green-500" : "text-red-500"}`}>
                    ${calculateBalance().toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">Your current financial balance</p>
            </CardContent>
        </Card>
    )
}
