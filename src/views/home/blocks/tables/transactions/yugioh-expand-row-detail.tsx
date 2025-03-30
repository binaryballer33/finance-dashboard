import type { YuGiOhCard } from "@/types/yu-gi-oh/yu-gi-oh"
import type { Row } from "@tanstack/react-table"

import Link from "next/link"

import { useMemo } from "react"

import { TableCell, TableRow } from "@/components/ui/table"

type YugiohExpandRowDetailProps = {
    row: Row<YuGiOhCard>
}

export default function YugiohExpandRowDetail(props: YugiohExpandRowDetailProps) {
    const { row } = props
    const card = row.original

    const rowDetailViewDataColOne = useMemo(() => {
        return [
            {
                title: "Name: ",
                value: card.name,
            },
            {
                title: "Archetype: ",
                value: card.archetype,
            },
            {
                title: "Type: ",
                value: card.type,
            },
            {
                title: "Race: ",
                value: card.race,
            },
        ]
    }, [card])

    const rowDetailViewDataColTwo = useMemo(() => {
        return [
            {
                title: "Price: ",
                value: card.price,
            },
            {
                title: "Description: ",
                value: card.desc,
            },
            {
                title: "YGOProDeck URL: ",
                value: card.ygoprodeck_url,
            },
            {
                title: "ID: ",
                value: card.id,
            },
            {
                title: "Frame Type: ",
                value: card.frameType,
            },
        ]
    }, [card])

    return (
        <TableRow>
            <TableCell colSpan={row.getVisibleCells().length}>
                <div className="flex gap-4">
                    <div className="flex w-[150px] flex-col items-center justify-center gap-4">
                        <Link href={card.ygoprodeck_url} target="_blank">
                            YGOPro
                        </Link>
                        <img alt="card preview" className="h-full w-full object-cover" src={card.imageUrl} />
                    </div>

                    <div className="flex w-1/2 items-center gap-4 text-left">
                        <div className="flex flex-col space-y-2">
                            {rowDetailViewDataColOne.map((data) => (
                                <p className="text-sm" key={data.title}>
                                    <span className="font-medium">{data.title}</span>{" "}
                                    <span className="text-muted-foreground">{data.value}</span>
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col space-y-2">
                            {rowDetailViewDataColTwo.map((data) => (
                                <p className="text-sm" key={data.title}>
                                    <span className="font-medium">{data.title}</span>{" "}
                                    <span className="text-muted-foreground">{data.value}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    )
}
