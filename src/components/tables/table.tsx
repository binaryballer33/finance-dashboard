"use client"

import type { ColumnDef, Table as ReactTable, Row } from "@tanstack/react-table"
import type { ComponentType } from "react"

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
import useResetColumnFilters from "./table-utils/hooks/use-reset-column-filters"
import useCreateTableData from "./table-utils/use-create-table-data"

type RowWithId = {
    id: string
}

type CustomTableProps<T> = {
    /* columns to display in the table */
    columns: ColumnDef<T>[]

    /* data to display in the table ( the rows ) */
    data: T[]

    /* optional component to expand the row in order to display more information for that row */
    expandRowDetailComponent?: ComponentType<{ row: Row<T>; table: ReactTable<T> }>

    /* handle creation of a button to create a new record, this is optional, the user will create the create action */
    handleCreateNewRecord?: () => void

    /* height of the table */
    height?: string

    /* columns to not display header names and header features */
    hideForColumns: string[]

    /* optional component to display when you have alot of data and you are using an infinite query for fetching more data */
    infiniteQueryHandlers?: {
        fetchNextPage: () => void
        hasNextPage: boolean
        isFetching: boolean
    }

    /* records per page options */
    recordsPerPage?: number[]

    /* optional component to display table stats, this component has access to the table instance */
    tableStatsComponent?: ComponentType<{ table: ReactTable<T> }>

    /* width of the table */
    width?: string
}

// TODO: fix yugioh cards not being deleted when the delete button is clicked, think it has to do with the row id not being unique or it being a number, or number converted to a string
export default function CustomTable<T extends RowWithId>(props: CustomTableProps<T>) {
    const {
        columns,
        data,
        expandRowDetailComponent,
        handleCreateNewRecord,
        height = "500px",
        hideForColumns,
        infiniteQueryHandlers,
        recordsPerPage,
        tableStatsComponent: TableStatsComponent,
        width = "100%",
    } = props

    // in case the px on the width is forgotten this will add it, also will still allow percentage widths
    const transformedWidth = !width?.endsWith("px") && !width?.endsWith("%") ? `${width}px` : width
    const transformedHeight = !height?.endsWith("px") && !height?.endsWith("%") ? `${height}px` : height

    const { columnOrder, handleDragEnd, rowOrder, sensors, tableConfig } = useCreateTableData<T>({
        columns,
        data,
        height: transformedHeight,
        width: transformedWidth,
    })

    const table = useReactTable<T>(tableConfig)

    // Add a stable ID for DnD context to prevent hydration errors and aria describe errors
    const dndContextId = useMemo(() => "table-dnd-context", [])

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
                <div className="flex w-full items-center gap-4 max-sm:gap-2">
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
                    {handleCreateNewRecord && (
                        <TableExtraCreateNewRecord handleCreateNewRecord={handleCreateNewRecord} />
                    )}

                    {/* Optional fetch more data component used for infinite queries */}
                    {infiniteQueryHandlers && <TableExtraInfiniteQueryButton {...infiniteQueryHandlers} />}
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
