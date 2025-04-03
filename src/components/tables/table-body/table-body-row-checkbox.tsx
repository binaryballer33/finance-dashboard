import type { Row } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

type TableBodyRowCheckboxProps = {
    row: Row<any>
}

export default function TableBodyRowCheckbox(props: TableBodyRowCheckboxProps) {
    const { row } = props

    return <Checkbox checked={row.getIsSelected()} onCheckedChange={(checked) => row.toggleSelected(!!checked)} />
}
