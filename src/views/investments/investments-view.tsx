"use client"

import { useSession } from "next-auth/react"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import { H5 } from "@/components/base/typography"

import TradeTable from "../home/blocks/tables/trades/trade-table"

export default function InvestmentsView() {
    const { data: session } = useSession()
    const userId = session?.user?.id

    if (!userId) return null

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="Your Personal Page For Investing" title="Investments" />

            <H5 className="mt-4 text-2xl font-bold">Covered Calls And Cash Secured Puts Table</H5>
            <TradeTable userId={userId} />
        </Container>
    )
}
