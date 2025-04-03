"use client"

import type { Table } from "@tanstack/react-table"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import TableExtraRecordsPerPage from "./table-extra-records-per-page"
import TableExtraSkipToPage from "./table-extra-skip-to-page"

type TableExtraPaginationProps = {
    recordsPerPage?: number[]
    table: Table<any>
}

// TODO: fix the width of the pagination buttons to be the same as the width of the table -- update fixed
// TODO: when no width given to table, pagination buttons and table are not aligned
export default function TableExtraPagination(props: TableExtraPaginationProps) {
    const { recordsPerPage = [10, 20, 30, 40, 50], table } = props

    // needed to make the pagination buttons and table align and to make the table width responsive
    const minWidthNeededForStyles = 1100
    const tableWidth = table.options.meta?.width || "500px"
    const tableNumberWidth = (!tableWidth.endsWith("%") && Number(tableWidth.replace("px", ""))) || 1100
    const lowTableWidth = (tableNumberWidth && tableNumberWidth < minWidthNeededForStyles) || false

    return (
        <div
            className={`flex w-full max-w-full flex-col items-center space-x-2 ${lowTableWidth ? "flex-col" : "lg:flex-row"} md:justify-between`}
            style={{ maxWidth: tableWidth }}
        >
            {/* Records per page option selector */}
            <div className="flex w-full gap-2 md:justify-between">
                <TableExtraRecordsPerPage recordsPerPage={recordsPerPage} table={table} />
                <TableExtraSkipToPage table={table} />
            </div>

            {/* Pagination buttons */}
            <div
                className={`${lowTableWidth ? "w-full justify-between" : "justify-end max-lg:w-full"} flex items-center gap-2 max-sm:w-full max-sm:justify-between`}
            >
                <Button
                    className="flex-1 max-md:w-24 max-sm:!w-16"
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.firstPage()}
                    size="icon"
                    variant="outline"
                >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="w-4 md:h-4" />
                </Button>

                <Button
                    className="flex-1 max-md:w-24 max-sm:!w-16"
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                    size="icon"
                    variant="outline"
                >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="w-4 md:h-4" />
                </Button>

                <Button
                    className="flex-1 max-md:w-24 max-sm:!w-16"
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                    size="icon"
                    variant="outline"
                >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="w-4 md:h-4" />
                </Button>

                <Button
                    className="flex-1 max-md:w-24 max-sm:!w-16"
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.lastPage()}
                    size="icon"
                    variant="outline"
                >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="w-4 md:h-4" />
                </Button>
            </div>
        </div>
    )
}
