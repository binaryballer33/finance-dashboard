import type { Trade } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import TableBodyRowCheckbox from "@/components/tables/table-body/table-body-row-checkbox"
import TableBodyRowDelete from "@/components/tables/table-body/table-body-row-delete"
import TableBodyRowRowDrag from "@/components/tables/table-body/table-body-row-drag"
import TableBodyRowExpand from "@/components/tables/table-body/table-body-row-expand"
import TableHeaderCheckboxAll from "@/components/tables/table-header/table-header-checkbox-all"
import TableHeaderDelete from "@/components/tables/table-header/table-header-delete"
import customFilter from "@/components/tables/table-utils/filters/custom-filter/custom-filter"
import hideColumns from "@/components/tables/table-utils/hide-columns"

const columnHelper = createColumnHelper<Trade>()

type UseCreateTradeTableColumnsProps = {
    shouldColumnBeExpandable?: boolean
}

export default function useCreateTradeTableColumns(props: UseCreateTradeTableColumnsProps = {}) {
    const { shouldColumnBeExpandable } = props

    // create the columns for the table, the id is also being used to create the footer and header tooltip content
    const columns = useMemo(() => {
        /* columns to display on the table for selecting rows, reordering rows, and expanding rows */
        const utilityColumns = [
            columnHelper.display({
                cell: ({ row }) => (
                    <div className="flex h-full w-full items-center justify-center">
                        <TableBodyRowCheckbox row={row} />
                    </div>
                ),
                footer: ({ column }) => column.id,
                header: ({ table }) => (
                    <div className="flex h-full w-full items-center justify-center">
                        <TableHeaderCheckboxAll table={table} />
                    </div>
                ),
                id: hideColumns.selectAll,
                maxSize: 25,
                minSize: 25,
            }),

            columnHelper.display({
                cell: ({ row }) => <TableBodyRowRowDrag rowId={row.id} />,
                footer: ({ column }) => column.id,
                id: hideColumns.dragRow,
                maxSize: 30,
            }),
        ]

        // Only add the expand column if expandRowDetailComponent is provided
        if (shouldColumnBeExpandable) {
            utilityColumns.push(
                columnHelper.display({
                    cell: ({ row }) => (row.getCanExpand() ? <TableBodyRowExpand row={row} /> : null),
                    footer: ({ column }) => column.id,
                    id: hideColumns.rowDetails,
                    maxSize: 30,
                }),
            )
        }

        /* columns to display the data */
        const dataColumns = [
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

        /* columns to display the actions */
        const actionColumns = [
            columnHelper.display({
                cell: ({ row, table }) => <TableBodyRowDelete row={row} table={table} />,
                footer: ({ column }) => column.id,
                header: () => <TableHeaderDelete />,
                id: hideColumns.delete,
            }),
        ]

        /* return the columns */
        return [...utilityColumns, ...dataColumns, ...actionColumns] as ColumnDef<Trade>[]
    }, [shouldColumnBeExpandable])

    return { columns }
}
