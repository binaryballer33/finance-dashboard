"use client"

import useGetIncomeByUserIdQuery from "@/api/incomes/queries/use-get-income-by-userId"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import { H5 } from "@/components/base/typography"

import FinanceCard from "../home/blocks/cards/finance-card"
import getTotal from "../../lib/data-aggregation/get-total"
import IncomeTable from "./blocks/income-table"

type IncomeViewProps = {
    userId: string
}

export default function IncomeView(props: IncomeViewProps) {
    const { userId } = props

    const { data: incomes = [] } = useGetIncomeByUserIdQuery(userId)
    const totalIncomes = getTotal({ usingArray: incomes, usingField: "amount" })

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="Your Personal Page For Income" title="Income" />

            <FinanceCard amount={totalIncomes} subTitle="Total Income Amount" title="Total Income" />

            <H5 className="mt-4 text-2xl font-bold">Your Monthly Recurring Incomes</H5>
            <IncomeTable incomes={incomes} userId={userId} />
        </Container>
    )
}
