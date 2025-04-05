import type { Expense } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"

import TableBodyRowCheckbox from "@/components/tables/table-body/table-body-row-checkbox"
import TableBodyRowRowDrag from "@/components/tables/table-body/table-body-row-drag"
import TableBodyRowExpand from "@/components/tables/table-body/table-body-row-expand"
import TableBodyRowHideRow from "@/components/tables/table-body/table-body-row-hide-row"
import TableHeaderCheckboxAll from "@/components/tables/table-header/table-header-checkbox-all"
import TableHeaderHideRow from "@/components/tables/table-header/table-header-hide-row"
import customFilter from "@/components/tables/table-utils/filters/custom-filter/custom-filter"
import hideColumns from "@/components/tables/table-utils/hide-columns"

const columnHelper = createColumnHelper<Expense>()

type UseCreateExpensesTableColumnsProps = {
    shouldColumnBeExpandable?: boolean
}

export default function useCreateExpensesTableColumns(props: UseCreateExpensesTableColumnsProps = {}) {
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
            columnHelper.accessor("category", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: ({ column }) => column.id,
                header: () => <span>Category</span>,
                id: "Category",
                minSize: 120,
            }),

            columnHelper.accessor("amount", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: ({ column }) => column.id,
                header: () => <span>Amount</span>,
                id: "Amount",
                minSize: 120,
            }),

            columnHelper.accessor("description", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: ({ column }) => column.id,
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
                footer: ({ column }) => column.id,
                header: () => <span>Date</span>,
                id: "Date",
                minSize: 120,
            }),
        ]

        /* columns to display the actions */
        const actionColumns = [
            columnHelper.display({
                cell: ({ row, table }) => <TableBodyRowHideRow row={row} table={table} />,
                footer: ({ column }) => column.id,
                header: () => <TableHeaderHideRow />,
                id: hideColumns.hideRow,
            }),
        ]

        /* return the columns */
        return [...utilityColumns, ...dataColumns, ...actionColumns] as ColumnDef<Expense>[]
    }, [shouldColumnBeExpandable])

    return { columns }
}
