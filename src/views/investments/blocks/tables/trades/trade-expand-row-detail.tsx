import type { Trade } from "@prisma/client"
import type { Row } from "@tanstack/react-table"

import { useMemo } from "react"

import { placeholderImage } from "@/lib/constants"
import { cn } from "@/lib/utils"

import { TableCell, TableRow } from "@/components/ui/table"

type TradeExpandRowDetailProps = {
    row: Row<Trade>
}

export default function TradeExpandRowDetail(props: TradeExpandRowDetailProps) {
    const { row } = props
    const trade = row.original // Assuming 'original' contains the trade data

    const rowDetailViewDataColOne = useMemo(() => {
        return [
            {
                title: "Date: ",
                value: trade.date.toString(),
            },
            {
                title: "Type: ",
                value: trade.type,
            },
            {
                title: "Realized: ",
                value: trade.realized,
            },
            {
                title: "Ticker: ",
                value: trade.ticker,
            },
            {
                title: "Strike: ",
                value: trade.strike,
            },
        ]
    }, [trade])

    const rowDetailViewDataColTwo = useMemo(() => {
        return [
            {
                title: "Contracts: ",
                value: trade.contracts,
            },
            {
                title: "Sell To Open: ",
                value: trade.sellToOpen,
            },
            {
                title: "Buy To Close: ",
                value: trade.buyToClose,
            },
            {
                className: cn("text-muted-foreground", trade.profitLoss > 0 ? "text-green-600" : "text-red-600"),
                title: "Profit/Loss: ",
                value: trade.profitLoss,
            },
            {
                className: cn(
                    "text-muted-foreground",
                    trade.profitLossPercentage > 0 ? "text-green-600" : "text-red-600",
                ),
                title: "Profit/Loss Percentage: ",
                value: trade.profitLossPercentage,
            },
        ]
    }, [trade])

    return (
        <TableRow>
            <TableCell colSpan={row.getVisibleCells().length}>
                <div className="flex gap-4">
                    <div className="w-[150px]">
                        <img alt="Trade preview" className="h-full w-full object-cover" src={placeholderImage} />
                    </div>

                    <div className="flex w-1/2 items-center gap-4 text-left">
                        <div className="flex flex-col space-y-2">
                            {rowDetailViewDataColOne.map((data) => (
                                <p className="text-sm" key={data.title}>
                                    <span className="font-medium">{data.title}</span>{" "}
                                    <span className="text-muted-foreground">{data.value}</span>
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col space-y-2">
                            {rowDetailViewDataColTwo.map((data) => (
                                <p className="text-sm" key={data.title}>
                                    <span className="font-medium">{data.title}</span>{" "}
                                    {data.className ? (
                                        <span className={data.className}>{data.value}</span>
                                    ) : (
                                        <span className="text-muted-foreground">{data.value}</span>
                                    )}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    )
}
