import type { Trade } from "@prisma/client"

import { createColumnHelper } from "@tanstack/react-table"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import customFilter from "@/components/tables/table-utils/filters/custom-filter/custom-filter"

const columnHelper = createColumnHelper<Trade>()

export default function useCreateTradeTableColumns() {
    // create the columns for the table, the id is also being used to create the footer and header tooltip content
    const columns = [
        columnHelper.accessor("date", {
            cell: ({ row }) => {
                const dayjsDate = getDayJsDateWithPlugins(row.original.date)

                return (
                    <TooltipProvider delayDuration={500}>
                        <Tooltip>
                            <TooltipTrigger>{dayjsDate.format("MM-DD-YYYY")}</TooltipTrigger>
                            <TooltipContent>
                                <p>{dayjsDate.format("ddd, MMM D, YYYY")}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            },
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            footer: ({ column }) => column.id,
            header: () => <span>Date</span>,
            id: "Date",
            minSize: 120,
        }),

        columnHelper.accessor("type", {
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            footer: ({ column }) => column.id,
            header: () => <span>Type</span>,
            id: "Type",
            minSize: 120,
        }),

        columnHelper.accessor("realized", {
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            footer: ({ column }) => column.id,
            header: () => <span>Realized</span>,
            id: "Realized",
            minSize: 120,
        }),

        columnHelper.accessor("ticker", {
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            footer: ({ column }) => column.id,
            header: () => <span>Ticker</span>,
            id: "Ticker",
            minSize: 120,
        }),

        columnHelper.accessor("strike", {
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            footer: ({ column }) => column.id,
            header: () => <span>Strike</span>,
            id: "Strike Price",
            minSize: 120,
        }),

        columnHelper.accessor("contracts", {
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            footer: ({ column }) => column.id,
            header: () => <span>Contracts</span>,
            id: "Contracts",
            minSize: 120,
        }),

        columnHelper.accessor("sellToOpen", {
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            footer: ({ column }) => column.id,
            header: () => <span>STO</span>,
            id: "Sell To Open",
            minSize: 120,
        }),

        columnHelper.accessor("buyToClose", {
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            footer: ({ column }) => column.id,
            header: () => <span>BTC</span>,
            id: "Buy To Close",
            minSize: 120,
        }),

        columnHelper.accessor("profitLoss", {
            cell: ({ row }) => {
                const { profitLoss } = row.original
                return <div className={profitLoss > 0 ? "text-green-500" : "text-red-500"}>{profitLoss}</div>
            },
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            footer: ({ column }) => column.id,
            header: () => <span>P / L</span>,
            id: "Profit / Loss",
            minSize: 120,
        }),

        columnHelper.accessor("profitLossPercentage", {
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            footer: ({ column }) => column.id,
            header: () => <span>P / L %</span>,
            id: "Profit / Loss %",
            minSize: 120,
        }),
    ]

    return { columns }
}
