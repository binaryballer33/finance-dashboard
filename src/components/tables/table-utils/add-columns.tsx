import type { ColumnDef } from "@tanstack/react-table"
import type { Dispatch, SetStateAction } from "react"

import TableBodyRowCheckbox from "../table-body/table-body-row-checkbox"
import TableBodyRowDelete from "../table-body/table-body-row-delete"
import TableBodyRowExpand from "../table-body/table-body-row-expand"
import TableBodyRowHideRow from "../table-body/table-body-row-hide-row"
import TableBodyRowUpdate from "../table-body/table-body-row-update-record"
import TableHeaderCheckboxAll from "../table-header/table-header-checkbox-all"
import hideColumns from "./hide-columns"

type AddColumnsProps<T> = {
    /* columns to display on the table */
    columns: ColumnDef<T>[]

    /* utility columns to add to the table */
    columnsToAdd?: {
        addDeleteRowColumn?: boolean
        addExpandRowColumn?: boolean
        addHideRowColumn?: boolean
        addSelectRowsColumn?: boolean
        addUpdateRowColumn?: boolean
    }

    deleteRecordButton?: {
        /* setter for the delete record dialog open state */
        setDeleteRecordDialogOpen: Dispatch<SetStateAction<boolean>>

        /* setter for the selected record */
        setSelectedRecord: Dispatch<SetStateAction<null | T>>
    }

    updateRecordButton?: {
        /* setter for the selected record */
        setSelectedRecord: Dispatch<SetStateAction<null | T>>

        /* setter for the update record dialog open state */
        setUpdateRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    }
}

export default function addColumns<T>(props: AddColumnsProps<T>) {
    const { columns, columnsToAdd, deleteRecordButton, updateRecordButton } = props

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

    if (columnsToAdd?.addExpandRowColumn) {
        cols.push({
            cell: ({ row }) =>
                row.getCanExpand() && columnsToAdd.addExpandRowColumn ? <TableBodyRowExpand row={row} /> : null,
            footer: ({ column }) => column.id,
            header: () => <div className="flex h-full w-full items-center justify-center">Expand</div>,
            id: hideColumns.rowDetails,
            maxSize: 30,
        })
    }

    if (columnsToAdd?.addUpdateRowColumn && updateRecordButton) {
        cols.push({
            cell: ({ row }) => (
                <TableBodyRowUpdate
                    row={row}
                    setSelectedRecord={updateRecordButton.setSelectedRecord}
                    setUpdateRecordDialogOpen={updateRecordButton.setUpdateRecordDialogOpen}
                />
            ),
            footer: ({ column }) => column.id,
            header: () => <div className="flex h-full w-full items-center justify-center">Update</div>,
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
            header: () => <div className="flex h-full w-full items-center justify-center">Hide</div>,
            id: hideColumns.hideRow,
        })
    }

    if (columnsToAdd?.addDeleteRowColumn && deleteRecordButton) {
        cols.push({
            cell: ({ row }) => (
                <TableBodyRowDelete
                    row={row}
                    setDeleteRecordDialogOpen={deleteRecordButton.setDeleteRecordDialogOpen}
                    setSelectedRecord={deleteRecordButton.setSelectedRecord}
                />
            ),
            footer: ({ column }) => column.id,
            header: () => <div className="flex h-full w-full items-center justify-center">Delete</div>,
            id: hideColumns.delete,
            maxSize: 30,
        })
    }

    return cols
}
