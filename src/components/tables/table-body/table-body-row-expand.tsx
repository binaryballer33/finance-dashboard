import type { Row } from "@tanstack/react-table"

import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

type TableBodyRowExpandProps = {
    row: Row<any>
}

export default function TableBodyRowExpand(props: TableBodyRowExpandProps) {
    const { row } = props

    return (
        <Button className="h-4 w-4" onClick={row.getToggleExpandedHandler()} size="icon" variant="ghost">
            {row.getIsExpanded() ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            <span className="sr-only">{row.getIsExpanded() ? "Collapse row" : "Expand row"}</span>
        </Button>
    )
}
