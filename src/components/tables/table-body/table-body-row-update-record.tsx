"use client"

// import type { Dispatch, SetStateAction } from "react"

import { Pencil } from "lucide-react"

// import { Button } from "@/components/ui/button"

// type TableBodyRowUpdateRecordProps = {
//     setUpdateRecordDialogOpen: Dispatch<SetStateAction<boolean>>
// }

// // TODO: fix issue where update row column is being treated as a way of dragging the row
// export default function TableBodyRowUpdate(props: TableBodyRowUpdateRecordProps) {
//     const { setUpdateRecordDialogOpen } = props

//     return (
//         <div className="flex h-full w-full items-center justify-center">
//             <Button onClick={() => setUpdateRecordDialogOpen(true)} size="sm" variant="ghost">
//                 <Pencil className="h-4 w-4" />
//             </Button>
//         </div>
//     )
// }

// TODO: fix issue where update row column is being treated as a way of dragging the row
export default function TableBodyRowUpdate() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Pencil className="h-4 w-4" />
        </div>
    )
}
