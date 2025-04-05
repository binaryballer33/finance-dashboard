import type { ColumnDef } from "@tanstack/react-table"

import TableBodyRowCheckbox from "../table-body/table-body-row-checkbox"
import TableBodyRowDelete from "../table-body/table-body-row-delete"
import TableBodyRowRowDrag from "../table-body/table-body-row-drag"
import TableBodyRowExpand from "../table-body/table-body-row-expand"
import TableBodyRowHideRow from "../table-body/table-body-row-hide-row"
import TableHeaderCheckboxAll from "../table-header/table-header-checkbox-all"
import TableHeaderDelete from "../table-header/table-header-delete"
import TableHeaderHideRow from "../table-header/table-header-hide-row"
import hideColumns from "./hide-columns"

/* TODO: add the ability to specify which utility columns are added to the table */
export default function addUtilityColumns<T>(columns: ColumnDef<T>[], rowsCanExpand: boolean) {
    /* columns to display on the table for selecting rows, reordering rows, expanding rows, deleting rows, and hiding rows */
    const columnsWithUtilityColumnsAdded = [
        {
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
        },

        {
            cell: () => <TableBodyRowRowDrag />,
            footer: ({ column }) => column.id,
            id: hideColumns.dragRow,
            maxSize: 30,
        },

        // Only add the expand column if expandRowDetailComponent is provided
        {
            cell: ({ row }) => (row.getCanExpand() && rowsCanExpand ? <TableBodyRowExpand row={row} /> : null),
            footer: ({ column }) => column.id,
            id: hideColumns.rowDetails,
            maxSize: 30,
        },

        // add the data columns that the table creator created for the table
        ...columns,

        // add the hide row column to the table
        {
            cell: ({ row, table }) => <TableBodyRowHideRow row={row} table={table} />,
            footer: ({ column }) => column.id,
            header: () => <TableHeaderHideRow />,
            id: hideColumns.hideRow,
        },

        // add the delete column to the table
        {
            cell: ({ row, table }) => <TableBodyRowDelete row={row} table={table} />,
            footer: ({ column }) => column.id,
            header: () => <TableHeaderDelete />,
            id: hideColumns.delete,
        },
    ]

    return columnsWithUtilityColumnsAdded
}
