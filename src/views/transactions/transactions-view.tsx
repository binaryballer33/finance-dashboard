"use client"

import useAuthUser from "@/hooks/useAuthUser"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import { H5 } from "@/components/base/typography"

import TransactionsTable from "../home/blocks/tables/transactions/transactions-table"

export default function TransactionsView() {
    const user = useAuthUser()
    if (!user) return null

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="Your Personal Page For Transactions" title="Transactions" />

            <H5 className="mt-4 text-2xl font-bold">All Of Your Recent Transactions</H5>
            <TransactionsTable userId={user.id} />
        </Container>
    )
}
