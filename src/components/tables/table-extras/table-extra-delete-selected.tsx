import type { Table } from "@tanstack/react-table"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

type TableExtraDeleteSelectedProps = {
    table: Table<any>
}

export default function TableExtraDeleteSelected(props: TableExtraDeleteSelectedProps) {
    const { table } = props

    const selectedRows = table.getSelectedRowModel().rows
    if (selectedRows.length === 0) return null

    // handle the deletion of the selected row(s)
    const handleDeleteSelected = () => {
        const selectedIds = selectedRows.map((row) => row.id)
        table.options.meta?.removeRows(selectedIds)
        table.resetRowSelection()
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
                {selectedRows.length} row{selectedRows.length > 1 ? "s" : ""} selected
            </span>
            <Button
                className="m-2.5 h-8 w-8 text-destructive hover:text-destructive/90"
                onClick={handleDeleteSelected}
                size="icon"
                variant="ghost"
            >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete selected rows</span>
            </Button>
        </div>
    )
}
