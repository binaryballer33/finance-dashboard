"use client"

import { useSession } from "next-auth/react"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import { H5 } from "@/components/base/typography"

import IncomeTable from "./blocks/income-table/income-table"

export default function IncomeView() {
    const { data: session } = useSession()
    const userId = session?.user?.id
    if (!userId) return null

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="Your Personal Page For Income" title="Income" />

            <H5 className="mt-4 text-2xl font-bold">Your Monthly Recurring Income</H5>
            <IncomeTable userId={userId} />
        </Container>
    )
}
