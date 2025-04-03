import type { Transaction } from "@prisma/client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"

import TableBodyRowCheckbox from "@/components/tables/table-body/table-body-row-checkbox"
import TableBodyRowDelete from "@/components/tables/table-body/table-body-row-delete"
import TableBodyRowRowDrag from "@/components/tables/table-body/table-body-row-drag"
import TableBodyRowExpand from "@/components/tables/table-body/table-body-row-expand"
import TableHeaderCheckboxAll from "@/components/tables/table-header/table-header-checkbox-all"
import TableHeaderDelete from "@/components/tables/table-header/table-header-delete"
import customFilter from "@/components/tables/table-utils/filters/custom-filter/custom-filter"

const columnHelper = createColumnHelper<Transaction>()

export default function useCreateTransactionsTableColumns() {
    // don't show the header features like sort, filter, drag and drop, etc for these columns
    const hideForColumnsMap = useMemo(
        () => ({
            delete: "Delete",
            dragRow: "Drag Row",
            rowDetails: "Row Details",
            selectAll: "Select All",
        }),
        [],
    )

    const hideForColumns = Object.values(hideForColumnsMap)

    // create the columns for the table, the id is also being used to create the footer and header tooltip content
    const columns = useMemo(
        () => [
            columnHelper.display({
                cell: ({ row }) => (
                    <div className="flex h-full w-full items-center justify-center">
                        <TableBodyRowCheckbox row={row} />
                    </div>
                ),
                footer: (props) => props.column.id,
                header: ({ table }) => (
                    <div className="flex h-full w-full items-center justify-center">
                        <TableHeaderCheckboxAll table={table} />
                    </div>
                ),
                id: hideForColumnsMap.selectAll,
                maxSize: 50,
            }),

            columnHelper.display({
                cell: ({ row }) => <TableBodyRowRowDrag rowId={row.id} />,
                footer: (props) => props.column.id,
                id: hideForColumnsMap.dragRow,
                maxSize: 30,
            }),

            columnHelper.display({
                cell: ({ row }) => (row.getCanExpand() ? <TableBodyRowExpand row={row} /> : null),
                footer: (props) => props.column.id,
                id: hideForColumnsMap.rowDetails,
                maxSize: 30,
            }),

            columnHelper.accessor("category", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Category</span>,
                id: "Category",
                minSize: 120,
            }),

            columnHelper.accessor("amount", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Amount</span>,
                id: "Amount",
                minSize: 120,
            }),

            columnHelper.accessor("description", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Description</span>,
                id: "Description",
                minSize: 120,
            }),

            columnHelper.accessor("date", {
                cell: ({ row }) => {
                    const { date } = row.original
                    return <span>{date.toLocaleDateString()}</span>
                },
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Date</span>,
                id: "Date",
                minSize: 120,
            }),

            columnHelper.display({
                cell: ({ row, table }) => <TableBodyRowDelete row={row} table={table} />,
                footer: (props) => props.column.id,
                header: () => <TableHeaderDelete />,
                id: hideForColumnsMap.delete,
            }),
        ],
        [hideForColumnsMap],
    )

    return { columns, hideForColumns }
}
