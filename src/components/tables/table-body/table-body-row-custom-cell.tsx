import type { Cell } from "@tanstack/react-table"

import { flexRender } from "@tanstack/react-table"

import { TableCell } from "@/components/ui/table"

type TableBodyRowCustomCellProps = {
    cell: Cell<any, unknown>
}

export default function TableBodyRowCustomCell(props: TableBodyRowCustomCellProps) {
    const { cell } = props

    return (
        <TableCell
            key={cell.id}
            style={{
                minWidth: cell.column.columnDef.minSize || 0,
                width: Math.max(cell.column.getSize(), cell.column.columnDef.minSize || 0),
            }}
        >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
    )
}
