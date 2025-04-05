"use client"

import type { DragEndEvent } from "@dnd-kit/core"
import type { ColumnDef, RowData, TableOptions } from "@tanstack/react-table"

import { useEffect, useMemo, useState } from "react"

import { KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"

import addColumns from "./add-columns"
import customFilter from "./filters/custom-filter/custom-filter"
import fuzzyFilter from "./filters/fuzzy-filter"

// Extend TanStack's TableMeta interface
declare module "@tanstack/table-core" {
    interface TableMeta<TData extends RowData> {
        /* table height */
        height: string

        /* table padding */
        padding: "lg" | "md" | "sm" | "xl"

        /* remove a row from the table */
        removeRow: (rowId: TData extends { id: infer U } ? U : never) => void

        /* remove multiple rows from the table */
        removeRows: (rowIds: Array<TData extends { id: infer U } ? U : never>) => void

        /* set the table padding */
        setTablePadding: (padding: "lg" | "md" | "sm" | "xl") => void

        /* table width */
        width: string
    }
}

type RowWithId = {
    /* row id used for dnd row reordering */
    id: number | string
}

type UseCreateTableDataProps<T extends RowWithId> = {
    /* table columns */
    columns: ColumnDef<T>[]

    /* utility columns to add to the table */
    columnsToAdd: {
        addDeleteRowColumn: boolean
        addExpandRowColumn: boolean
        addHideRowColumn: boolean
        addRowReorderColumn: boolean
        addSelectRowsColumn: boolean
    }

    /* table rows (data) */
    data: T[]

    /* table height */
    height?: string

    /* table width */
    width?: string
}

export default function useCreateTableData<T extends RowWithId>(props: UseCreateTableDataProps<T>) {
    const { columns: initialColumns, columnsToAdd, data: initialData, height = "500px", width = "100%" } = props

    const columns = useMemo(() => addColumns({ columns: initialColumns, columnsToAdd }), [initialColumns, columnsToAdd])

    // get table row data
    const [data, setData] = useState(initialData)

    // get the columnIds for column visibility toggling
    const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map((column) => column.id!))

    // row order for dnd row reordering
    const [rowOrder, setRowOrder] = useState<string[]>(() => initialData.map((row) => row.id.toString()))

    const [tablePadding, setTablePadding] = useState<"lg" | "md" | "sm" | "xl">("md")

    // Update data and row order when initialData changes
    useEffect(() => {
        setData(initialData)
        setRowOrder(initialData.map((row) => row.id.toString()))
    }, [initialData])

    // sensors for dnd column reordering
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor),
    )

    // reorder row / column after using dnd
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!active || !over || active.id === over.id) return

        // check if the active item is a column or a row by checking the type that was assigned using the useSortable hook
        const isColumn = active.data.current?.type === "column"
        const isRow = active.data.current?.type === "row"

        if (isColumn) {
            const oldIndex = columnOrder.indexOf(active.id.toString())
            const newIndex = columnOrder.indexOf(over.id.toString())

            // arrayMove is a function that moves an item in an array to a new index, fancy splice from dnd-kit
            setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex))
        } else if (isRow) {
            const activeId = active.id.toString()
            const overId = over.id.toString()

            // get the old index and new index of the row
            const oldIndex = rowOrder.indexOf(activeId)
            const newIndex = rowOrder.indexOf(overId)

            // if the old index and new index are not -1, then we can move the row
            if (oldIndex !== -1 && newIndex !== -1) {
                // arrayMove is a function that moves an item in an array to a new index, fancy splice from dnd-kit
                const newRowOrder = arrayMove(rowOrder, oldIndex, newIndex)
                const newData = arrayMove(data, oldIndex, newIndex)

                setRowOrder(newRowOrder)
                setData(newData)
            }
        }
    }

    /*
     if the data is updated from the outside, update the data and row order
     this is used to update the data when the user fetches more data from the server and appends it to the existing data
    */
    const updateData = (newData: T[]) => {
        setData(newData)
        setRowOrder(newData.map((row) => row.id.toString()))
    }

    // create the table config
    const tableConfig: TableOptions<T> = {
        // used to resize columns, default is ltr
        columnResizeDirection: "ltr",

        // used to resize columns, default is onChange so it will resize while the mouse is being dragged
        columnResizeMode: "onChange",

        // the columns for the table
        columns,

        // the records for the table
        data,

        // used to select rows
        enableRowSelection: true,

        // used to filter the table
        filterFns: {
            advanced: customFilter,
            fuzzy: fuzzyFilter,
        },

        // used to get all the rows for the table
        getCoreRowModel: getCoreRowModel(),

        // filtering for the table
        getFilteredRowModel: getFilteredRowModel(),

        // pagination for the table
        getPaginationRowModel: getPaginationRowModel(),

        // expand button for rows
        getRowCanExpand: () => true,

        // get the row id for the table, helps with smooth row reordering with dnd, without it, row dnd is more choppy
        getRowId: (row) => row.id.toString(),

        // sorting for the table
        getSortedRowModel: getSortedRowModel(),

        // global filter for the table
        globalFilterFn: fuzzyFilter,

        // handle row state deletion
        meta: {
            /* table height */
            height,

            /* table padding */
            padding: tablePadding,

            /* remove a row from the table */
            removeRow: (rowId: number | string) => {
                const newData = data.filter((row) => row.id !== rowId)
                updateData(newData)
            },

            /* remove multiple rows from the table */
            removeRows: (rowIds: (number | string)[]) => {
                const newData = data.filter((row) => !rowIds.includes(row.id))
                updateData(newData)
            },

            /* set the table padding */
            setTablePadding,

            /* table width */
            width,
        },

        // update the column order for dnd column reordering
        onColumnOrderChange: setColumnOrder,

        // state for the table
        state: {
            /* column order used for dnd column reordering */
            columnOrder,
        },
    }

    return {
        columnOrder,
        columns,
        data,
        handleDragEnd,
        rowOrder,
        sensors,
        tableConfig,
    }
}
