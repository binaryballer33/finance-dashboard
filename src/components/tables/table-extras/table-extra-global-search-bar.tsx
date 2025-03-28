import type { Table } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"

type TableExtraGlobalSearchBarProps = {
    table: Table<any>
}

export default function TableExtraGlobalSearchBar(props: TableExtraGlobalSearchBarProps) {
    const { table } = props

    return (
        <Input
            className="flex-1 md:ml-2"
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder="Search..."
        />
    )
}
