import type { Table } from "@tanstack/react-table"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../../components/ui/accordion"

type TableDemoStatsProps = {
    table: Table<any>
}

export default function TradeStats({ table }: TableDemoStatsProps) {
    // Get all rows that match current filters
    const trades = table.getFilteredRowModel().rows.map((row) => row.original)

    // Calculate summary statistics
    const totalProfitLoss = trades.reduce((sum, trade) => sum + trade.profitLoss, 0)
    const tradeCount = trades.length
    const averageProfitLoss = tradeCount > 0 ? totalProfitLoss / tradeCount : 0

    return (
        <Accordion className="md:w-[500px]" collapsible type="single">
            <AccordionItem value="item-1">
                <AccordionTrigger className="hover:text-xl hover:text-primary data-[state=open]:text-primary">
                    <span className="font-medium">Table Stats</span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex items-center space-x-2 max-sm:flex-col">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Total P&L:</span>
                            <span className={totalProfitLoss > 0 ? "text-green-600" : "text-red-600"}>
                                ${totalProfitLoss.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Avg P&L:</span>
                            <span className={averageProfitLoss > 0 ? "text-green-600" : "text-red-600"}>
                                ${averageProfitLoss.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Trade Count:</span>
                            <span className="text-muted-foreground">{tradeCount}</span>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
