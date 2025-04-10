import type { Table } from "@tanstack/react-table"

import { useState } from "react"

import { Input } from "@/components/ui/input"

type TableExtraSkipToPageProps = {
    table: Table<any>
}

export default function TableExtraSkipToPage(props: TableExtraSkipToPageProps) {
    const { table } = props

    // needed to make the records per page selector and table align and to make the table width responsive
    const minWidthNeededForStyles = 500
    const tableWidth = Number(table.options.meta?.width.replace("px", "")) || 500
    const lowTableWidth = tableWidth < minWidthNeededForStyles

    const [inputValue, setInputValue] = useState<string>(String(table.getState().pagination.pageIndex + 1))

    const handleInputBoxPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setInputValue(value)
        const page = Number(value)

        // Only update the actual page if it's valid
        if (!Number.isNaN(page) && page >= 1 && page <= table.getPageCount()) table.setPageIndex(page - 1)
    }

    return !lowTableWidth ? (
        <div className="flex h-10 flex-1 items-center justify-between gap-4 text-sm font-medium max-sm:w-full max-sm:justify-end">
            <div className="flex items-center justify-center gap-1">
                <span className="text-sm max-sm:hidden">Page</span>
                <span className="whitespace-nowrap">
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-sm max-sm:hidden">Go To:</span>

                {/* Manual page number input box and page number display */}
                <Input
                    aria-label="Go To Page"
                    className="w-[70px] max-sm:w-[35px] max-sm:p-0"
                    id="table-skip-to-page"
                    // Update input value when page changes via this input box
                    onBlur={() => setInputValue(String(table.getState().pagination.pageIndex + 1))}
                    onChange={handleInputBoxPageChange}
                    type="number"
                    value={inputValue}
                />
            </div>
        </div>
    ) : null
}
