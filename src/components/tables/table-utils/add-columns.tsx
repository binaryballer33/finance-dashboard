import type { ColumnDef } from "@tanstack/react-table"

import TableBodyRowCheckbox from "../table-body/table-body-row-checkbox"
import TableBodyRowDelete from "../table-body/table-body-row-delete"
import TableBodyRowRowDrag from "../table-body/table-body-row-drag"
import TableBodyRowExpand from "../table-body/table-body-row-expand"
import TableBodyRowHideRow from "../table-body/table-body-row-hide-row"
import TableBodyRowUpdate from "../table-body/table-body-row-update-record"
import TableHeaderCheckboxAll from "../table-header/table-header-checkbox-all"
import TableHeaderDelete from "../table-header/table-header-delete"
import TableHeaderHideRow from "../table-header/table-header-hide-row"
import hideColumns from "./hide-columns"

type AddColumnsProps<T> = {
    /* columns to display on the table */
    columns: ColumnDef<T>[]

    /* utility columns to add to the table */
    columnsToAdd?: {
        addDeleteRowColumn?: boolean
        addExpandRowColumn?: boolean
        addHideRowColumn?: boolean
        addRowReorderColumn?: boolean
        addSelectRowsColumn?: boolean
        addUpdateRowColumn?: boolean
    }
}

export default function addColumns<T>(props: AddColumnsProps<T>) {
    const { columns, columnsToAdd } = props

    const cols: ColumnDef<T>[] = []

    if (columnsToAdd?.addSelectRowsColumn) {
        cols.push({
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
        })
    }

    if (columnsToAdd?.addRowReorderColumn) {
        cols.push({
            cell: () => <TableBodyRowRowDrag />,
            footer: ({ column }) => column.id,
            id: hideColumns.dragRow,
            maxSize: 30,
        })
    }

    if (columnsToAdd?.addExpandRowColumn) {
        cols.push({
            cell: ({ row }) =>
                row.getCanExpand() && columnsToAdd.addExpandRowColumn ? <TableBodyRowExpand row={row} /> : null,
            footer: ({ column }) => column.id,
            id: hideColumns.rowDetails,
            maxSize: 30,
        })
    }

    if (columnsToAdd?.addUpdateRowColumn) {
        cols.push({
            cell: () => <TableBodyRowUpdate />,
            footer: ({ column }) => column.id,
            id: hideColumns.updateRow,
            maxSize: 30,
        })
    }

    /* add the data columns that the table creator created for the table */
    cols.push(...columns)

    if (columnsToAdd?.addHideRowColumn) {
        cols.push({
            cell: ({ row, table }) => <TableBodyRowHideRow row={row} table={table} />,
            footer: ({ column }) => column.id,
            header: () => <TableHeaderHideRow />,
            id: hideColumns.hideRow,
        })
    }

    if (columnsToAdd?.addDeleteRowColumn) {
        cols.push({
            cell: ({ row, table }) => <TableBodyRowDelete row={row} table={table} />,
            footer: ({ column }) => column.id,
            header: () => <TableHeaderDelete />,
            id: hideColumns.delete,
        })
    }

    return cols
}
