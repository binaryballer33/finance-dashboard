"use client"

import useAuthUser from "@/hooks/use-auth-user"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import { H5 } from "@/components/base/typography"

import IncomeTable from "./blocks/income-table"

export default function IncomeView() {
    const user = useAuthUser()
    if (!user) return null

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="Your Personal Page For Income" title="Income" />

            <H5 className="mt-4 text-2xl font-bold">Your Monthly Recurring Income</H5>
            <IncomeTable userId={user.id} />
        </Container>
    )
}
