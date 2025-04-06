"use client"

import type { Row } from "@tanstack/react-table"
import type { Dispatch, SetStateAction } from "react"

import { Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"

type TableBodyRowUpdateRecordProps<T> = {
    row: Row<T>
    setSelectedRecord: Dispatch<SetStateAction<null | T>>
    setUpdateRecordDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function TableBodyRowUpdate<T>(props: TableBodyRowUpdateRecordProps<T>) {
    const { row, setSelectedRecord, setUpdateRecordDialogOpen } = props

    const handleUpdate = () => {
        setSelectedRecord(row.original)
        setUpdateRecordDialogOpen(true)
    }

    return (
        <div className="flex h-full w-full items-center justify-center">
            <Button onClick={handleUpdate} size="sm" variant="ghost">
                <Pencil className="h-4 w-4" />
            </Button>
        </div>
    )
}
