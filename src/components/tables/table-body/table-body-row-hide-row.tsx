import type { Row, Table } from "@tanstack/react-table"

import { EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"

type TableBodyRowHideRowProps = {
    row: Row<any>
    table: Table<any>
}

export default function TableBodyRowHideRow(props: TableBodyRowHideRowProps) {
    const { row, table } = props

    return (
        <div className="flex items-center justify-center">
            <Button
                className="h-8 w-8 text-muted-foreground hover:text-muted-foreground/90"
                onClick={() => table.options.meta?.removeRow(row.id)}
                size="icon"
                variant="ghost"
            >
                <EyeOff className="h-4 w-4" />
                <span className="sr-only">Hide Row</span>
            </Button>
        </div>
    )
}
