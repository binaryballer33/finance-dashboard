import type { Table } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"

type TableExtraGlobalSearchBarProps = {
    table: Table<any>
}

export default function TableExtraGlobalSearchBar(props: TableExtraGlobalSearchBarProps) {
    const { table } = props

    return (
        <Input
            aria-label="Global Search"
            className="flex-1 md:ml-2"
            id="table-global-search-bar"
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder="Search..."
        />
    )
}
