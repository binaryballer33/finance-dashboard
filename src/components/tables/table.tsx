"use client"

import type { ColumnDef, Table as ReactTable, Row } from "@tanstack/react-table"
import type { ComponentType, Dispatch, SetStateAction } from "react"

import { useMemo } from "react"

import { closestCenter, DndContext } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table"

import TableBodyRowCustom from "./table-body/table-body-row-custom"
import TableBodyRowNoRecordsFound from "./table-body/table-body-row-no-records-found"
import TableExtraColumnVisibility from "./table-extras/table-extra-column-visibility"
import TableExtraCreateNewRecord from "./table-extras/table-extra-create-new-record"
import TableExtraDeleteSelected from "./table-extras/table-extra-delete-selected"
import TableExtraDropdownMenuSettings from "./table-extras/table-extra-dropdown-menu-settings"
import TableExtraGlobalSearchBar from "./table-extras/table-extra-global-search-bar"
import TableExtraInfiniteQueryButton from "./table-extras/table-extra-infinite-query-button"
import TableExtraPagination from "./table-extras/table-extra-pagination"
import TableHeaderCustomHead from "./table-header/table-header-custom-head"
import hideColumns from "./table-utils/hide-columns"
import useResetColumnFilters from "./table-utils/hooks/use-reset-column-filters"
import useCreateTableData from "./table-utils/use-create-table-data"

type RowWithId = {
    id: string
}

type CustomTableProps<T> = {
    /* columns to display in the table */
    columns: ColumnDef<T>[]

    /* additional utility columns to add to the table */
    columnsToAdd?: {
        addDeleteRowColumn?: boolean
        addExpandRowColumn?: boolean
        addHideRowColumn?: boolean
        addSelectRowsColumn?: boolean
        addUpdateRowColumn?: boolean
    }

    createNewRecordButton?: {
        /* tooltip content for the create new record button */
        createNewRecordButtonTooltipContent?: string

        /* setter for the create new record dialog */
        setCreateNewRecordDialogOpen: Dispatch<SetStateAction<boolean>>

        /* userId for creating new records */
        userId: string
    }

    /* data to display in the table ( the rows ) */
    data: T[]

    deleteRecordButton?: {
        /* setter for the delete record dialog open state */
        setDeleteRecordDialogOpen: Dispatch<SetStateAction<boolean>>

        /* setter for the selected record */
        setSelectedRecord?: Dispatch<SetStateAction<null | T>>
    }

    /* optional component to expand the row in order to display more information for that row */
    expandRowDetailComponent?: ComponentType<{ row: Row<T>; table: ReactTable<T> }>

    /* height of the table */
    height?: string

    /* optional component to display when you have alot of data and you are using an infinite query for fetching more data */
    infiniteQueryHandlers?: {
        /* fetch the next page of data */
        fetchNextPage: () => void

        /* see if there is more data to fetch */
        hasNextPage: boolean

        /* tooltip content for the load more data button */
        infiniteQueryButtonTooltipContent?: string

        /* see if the data is being fetched */
        isFetching: boolean
    }

    /* records per page options, default is 10, 20, 30, 40, 50, 100 */
    recordsPerPage?: number[]

    /* optional component to display table stats, this component has access to the table instance */
    tableStatsComponent?: ComponentType<{ table: ReactTable<T> }>

    updateRecordButton?: {
        /* setter for the selected record */
        setSelectedRecord: Dispatch<SetStateAction<null | T>>

        /* setter for the update record dialog open state */
        setUpdateRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    }

    /* width of the table */
    width?: string
}

export default function CustomTable<T extends RowWithId>(props: CustomTableProps<T>) {
    const {
        columns,
        columnsToAdd,
        createNewRecordButton,
        data,
        deleteRecordButton,
        expandRowDetailComponent,
        height = "500px",
        infiniteQueryHandlers,
        recordsPerPage = [10, 20, 30, 40, 50, 100],
        tableStatsComponent: TableStatsComponent,
        updateRecordButton,
        width = "100%",
    } = props

    // in case the px on the width is forgotten this will add it, also will still allow percentage widths
    const transformedWidth = !width?.endsWith("px") && !width?.endsWith("%") ? `${width}px` : width
    const transformedHeight = !height?.endsWith("px") && !height?.endsWith("%") ? `${height}px` : height

    const { columnOrder, handleDragEnd, rowOrder, sensors, tableConfig } = useCreateTableData<T>({
        columns,
        columnsToAdd: {
            addDeleteRowColumn: columnsToAdd?.addDeleteRowColumn || false,
            addExpandRowColumn: columnsToAdd?.addExpandRowColumn || false,
            addHideRowColumn: columnsToAdd?.addHideRowColumn || false,
            addSelectRowsColumn: columnsToAdd?.addSelectRowsColumn || false,
            addUpdateRowColumn: columnsToAdd?.addUpdateRowColumn || false,
        },
        data,
        deleteRecordButton,
        height: transformedHeight,
        updateRecordButton,
        width: transformedWidth,
    })

    // columns to not display header names and header features
    const hideForColumns = Object.values(hideColumns)

    // Add a stable ID for DnD context to prevent hydration errors and aria describe errors
    const dndContextId = useMemo(() => "table-dnd-context", [])

    const table = useReactTable<T>(tableConfig)

    // clear all the table column filters when the table is mounted
    useResetColumnFilters(table)

    if (!table) return null

    return (
        <div className="flex flex-col gap-2 md:p-2">
            {/* Extra table features */}
            <div
                className="flex flex-col items-center justify-between gap-4 md:flex-row"
                style={{ maxWidth: transformedWidth, minWidth: "250px" }}
            >
                <div className="flex w-full items-center gap-2 max-sm:gap-2">
                    {table.getIsSomeRowsSelected() || table.getIsAllRowsSelected() ? (
                        <TableExtraDeleteSelected table={table} />
                    ) : (
                        <>
                            {/* Table Column Visibility */}
                            <TableExtraColumnVisibility columnOrder={columnOrder} table={table} />

                            {/* Table Dropdown Menu Settings */}
                            <TableExtraDropdownMenuSettings table={table} />
                        </>
                    )}
                    {/* Table Global Search Bar */}
                    <TableExtraGlobalSearchBar table={table} />

                    {/* create a button to add a new row */}
                    {createNewRecordButton && (
                        <TableExtraCreateNewRecord
                            setCreateNewRecordDialogOpen={createNewRecordButton.setCreateNewRecordDialogOpen}
                            tooltipContent={createNewRecordButton?.createNewRecordButtonTooltipContent}
                        />
                    )}

                    {/* Optional fetch more data component used for infinite queries */}
                    {infiniteQueryHandlers && (
                        <TableExtraInfiniteQueryButton
                            {...infiniteQueryHandlers}
                            tooltipContent={infiniteQueryHandlers.infiniteQueryButtonTooltipContent}
                        />
                    )}
                </div>
            </div>

            {/* dnd context to allow reordering of the table rows and columns */}
            <DndContext
                collisionDetection={closestCenter}
                id={dndContextId}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                {/* table container */}
                <div
                    className="relative overflow-x-auto overflow-y-auto rounded-md border max-sm:w-full"
                    style={{ height: transformedHeight, maxWidth: transformedWidth }}
                >
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-background">
                            {/* Table header rows */}
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow className="[&>th]:border-r [&>th]:border-black/10" key={headerGroup.id}>
                                    {/* dnd sortable context for the table header cells */}
                                    <SortableContext items={columnOrder}>
                                        {/* Table header cells */}
                                        {headerGroup.headers.map((header) => (
                                            <TableHeaderCustomHead
                                                header={header}
                                                hideForColumns={hideForColumns || []}
                                                key={header.id}
                                                table={table}
                                            />
                                        ))}
                                    </SortableContext>
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {/* dnd sortable context for the table rows */}
                            {table.getRowModel().rows.length ? (
                                <SortableContext items={rowOrder}>
                                    {table.getRowModel().rows.map((row) => (
                                        <TableBodyRowCustom
                                            expandRowDetailComponent={expandRowDetailComponent}
                                            key={row.id}
                                            row={row}
                                            table={table}
                                        />
                                    ))}
                                </SortableContext>
                            ) : (
                                // if no data is found that matches the search, display this message
                                <TableBodyRowNoRecordsFound table={table} />
                            )}
                        </TableBody>
                    </Table>
                </div>
            </DndContext>

            {/* Pagination */}
            <TableExtraPagination recordsPerPage={recordsPerPage} table={table} />

            {/* Optional table stats component */}
            {TableStatsComponent && <TableStatsComponent table={table} />}
        </div>
    )
}
