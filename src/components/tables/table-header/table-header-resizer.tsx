"use client"

import { type Header, type Table } from "@tanstack/react-table"
import { ArrowRightToLine } from "lucide-react"

type TableHeaderResizerProps = {
    header: Header<any, any>
    table: Table<any>
}

// TODO: Fix the issue where the column filters are changed when the column is resized
export default function TableHeaderResizer(props: TableHeaderResizerProps) {
    const { header, table } = props

    const handleResizeStart = (event: React.MouseEvent | React.TouchEvent) => {
        header.getResizeHandler()(event)
    }

    return (
        header.column.getCanResize() && (
            <ArrowRightToLine
                className={`
                        absolute right-0 top-0 h-full w-3
                        cursor-col-resize touch-none select-none
                        bg-secondary/50 opacity-100 max-sm:w-1.5
                    `}
                onDoubleClick={() => header.column.resetSize()}
                onMouseDown={handleResizeStart}
                onMouseOver={() => table.resetColumnFilters()}
                onTouchStart={handleResizeStart}
            />
        )
    )
}
