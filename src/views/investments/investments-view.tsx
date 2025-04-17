"use client"

import useGetTradesByUserIdQuery from "@/api/trades/queries/use-get-trades-by-userId"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import { H5 } from "@/components/base/typography"

import FinanceCard from "../home/blocks/analytics/cards/finance-card"
import TradeTable from "./blocks/trade-table"

type InvestmentsViewProps = {
    userId: string
}

export default function InvestmentsView(props: InvestmentsViewProps) {
    const { userId } = props

    const { data: trades = [] } = useGetTradesByUserIdQuery(userId)
    const totalInvestments = trades.reduce((acc, trade) => acc + trade.profitLoss, 0)

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="Your Personal Page For Investing" title="Investments" />

            <FinanceCard
                amount={totalInvestments}
                subTitle="Total Cash Secured Puts And Covered Calls"
                title="Total Investments"
            />

            <H5 className="mt-4 text-2xl font-bold">Covered Calls And Cash Secured Puts Table</H5>
            <TradeTable trades={trades} userId={userId} />
        </Container>
    )
}
