"use client"

import useAuthUser from "@/hooks/use-auth-user"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import { H5 } from "@/components/base/typography"

import TradeTable from "./blocks/tables/trades/trade-table"

export default function InvestmentsView() {
    const user = useAuthUser()
    if (!user) return null

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="Your Personal Page For Investing" title="Investments" />

            <H5 className="mt-4 text-2xl font-bold">Covered Calls And Cash Secured Puts Table</H5>
            <TradeTable userId={user.id} />
        </Container>
    )
}
