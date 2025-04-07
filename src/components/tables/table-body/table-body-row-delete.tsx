import type { Row } from "@tanstack/react-table"
import type { Dispatch, SetStateAction } from "react"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

type TableBodyRowDeleteProps<T> = {
    row: Row<T>
    setDeleteRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    setSelectedRecord: Dispatch<SetStateAction<null | T>>
}

export default function TableBodyRowDelete<T>(props: TableBodyRowDeleteProps<T>) {
    const { row, setDeleteRecordDialogOpen, setSelectedRecord } = props

    return (
        <div className="flex items-center justify-center">
            <Button
                className="h-8 w-8 text-destructive hover:text-destructive/90"
                onClick={() => {
                    setSelectedRecord(row.original)
                    setDeleteRecordDialogOpen(true)
                }}
                size="icon"
                variant="ghost"
            >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete Row</span>
            </Button>
        </div>
    )
}
