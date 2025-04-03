import type { ComponentType, CSSProperties } from "react"

import { Fragment } from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { flexRender, type Row, type Table } from "@tanstack/react-table"

import { cn } from "@/lib/utils"

import { TableCell, TableRow } from "@/components/ui/table"

type TableBodyRowCustomProps = {
    className?: string
    expandRowDetailComponent?: ComponentType<{ row: Row<any>; table: Table<any> }>
    row: Row<any>
    table: Table<any>
}

export default function TableBodyRowCustom(props: TableBodyRowCustomProps) {
    const { className, expandRowDetailComponent: ExpandRowDetailComponent, row, table } = props
    const paddingConfig = { lg: "p-4", md: "p-2", sm: "p-1", xl: "p-6" }
    const padding = table.options.meta?.padding!

    // dnd sortable context for the table body cells
    const { isDragging, setNodeRef, transform, transition } = useSortable({
        // this is needed for the dnd sortable to work, it needs to know what if its a column or row
        data: { type: "row" },
        id: row.id,
    })

    // dnd draggable styles for the table header cell
    const style: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: "relative",
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition,
        zIndex: isDragging ? 1 : 0,
    }

    const isOddRow = row.index % 2 === 1

    return (
        <Fragment key={row.id}>
            <TableRow
                className={`
                    ${isOddRow ? "bg-accent" : ""}
                    ${row.getIsSelected() ? "bg-primary" : ""}
                    hover:bg-black/[.05]
                    [&>td]:border-r [&>td]:border-black/10
                `}
                ref={setNodeRef}
                style={style}
            >
                {/* the table body cells */}
                {row.getVisibleCells().map((cell) => (
                    <TableCell
                        className={cn(paddingConfig[padding], className)}
                        key={cell.id}
                        style={{
                            minWidth: cell.column.columnDef.minSize || 0,
                            textAlign: "center",
                            width: Math.max(cell.column.getSize(), cell.column.columnDef.minSize || 0),
                        }}
                    >
                        <div style={{ maxHeight: "100px", overflow: "auto" }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                    </TableCell>
                ))}
            </TableRow>

            {/* TODO: only let this column appear if the user has made a component for expanding the row */}
            {/* if the row is expanded, display the row detail view */}
            {row.getIsExpanded() && ExpandRowDetailComponent && <ExpandRowDetailComponent row={row} table={table} />}
        </Fragment>
    )
}
