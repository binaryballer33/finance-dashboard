import { Loader2 } from "lucide-react"
import { TbDatabaseShare } from "react-icons/tb"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type TableExtraInfiniteQueryButtonProps = {
    fetchNextPage: () => void
    hasNextPage: boolean
    isFetching: boolean
}

export default function TableExtraInfiniteQueryButton(props: TableExtraInfiniteQueryButtonProps) {
    const { fetchNextPage, hasNextPage, isFetching } = props

    return isFetching ? (
        <Loader2 className="animate-spin" size={16} />
    ) : (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button disabled={!hasNextPage || isFetching} onClick={() => fetchNextPage()} size="sm">
                        <TbDatabaseShare />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Load More Data</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
