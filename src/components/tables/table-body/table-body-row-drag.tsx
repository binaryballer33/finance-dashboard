import { ArrowUpDown } from "lucide-react"

export default function TableBodyRowDrag() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <ArrowUpDown className="h-4 w-4 cursor-move" />
        </div>
    )
}
