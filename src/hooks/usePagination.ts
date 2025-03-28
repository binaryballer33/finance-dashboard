import type { ChangeEvent } from "react"

import { useState } from "react"

export default function usePagination(initialPage = 0, initialLimit = 10) {
    const [page, setPage] = useState<number>(initialPage)
    const [limit, setLimit] = useState<number>(initialLimit)

    const handlePageChange = (_event: any, newPage: number): void => {
        setPage(newPage)
    }

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value, 10))
    }

    /* call this on the data that you want to paginate in order to get the paginated data */
    const paginate = (records: any[], pageNumber: number, pageLimit: number): any[] => {
        const firstRecord = pageNumber * pageLimit
        const lastRecord = Math.min(pageNumber * pageLimit + pageLimit, records.length)
        return records.slice(firstRecord, lastRecord)
    }

    return {
        handleLimitChange,
        handlePageChange,
        limit,
        page,
        paginate,
    }
}
