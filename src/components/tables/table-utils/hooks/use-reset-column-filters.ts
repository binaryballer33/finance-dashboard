import type { Table } from "@tanstack/react-table"

import { useEffect } from "react"

/* clear all the table column filters when the table is mounted */
export default function useResetColumnFilters(table: Table<any>) {
    useEffect(() => {
        table.resetColumnFilters()
    }, [table])
}
