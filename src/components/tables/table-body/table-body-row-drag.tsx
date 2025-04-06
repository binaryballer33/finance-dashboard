import { ArrowUpDown } from "lucide-react"

// TODO: maybe see if i can just add the dnd row reordering to the table body row drag column and not the entire row
export default function TableBodyRowDrag() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <ArrowUpDown className="h-4 w-4 cursor-move" />
        </div>
    )
}
