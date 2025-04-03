import { useSortable } from "@dnd-kit/sortable"
import { ArrowUpDown } from "lucide-react"

type TableBodyRowDragProps = {
    rowId: string
}

export default function TableBodyRowDrag(props: TableBodyRowDragProps) {
    const { rowId } = props

    const { attributes, listeners } = useSortable({
        data: {
            // this is needed for the dnd sortable to work, it needs to know what if its a column or row
            type: "row",
        },
        id: rowId,
    })

    return (
        <div className="flex h-full w-full items-center justify-center">
            <ArrowUpDown {...attributes} {...listeners} className="h-4 w-4" />
        </div>
    )
}
