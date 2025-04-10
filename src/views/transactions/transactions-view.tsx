"use client"

import useAuthUser from "@/hooks/use-auth-user"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"

import TransactionsTable from "./blocks/transactions/transactions-table"

export default function TransactionsView() {
    const user = useAuthUser()
    if (!user) return null

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="All Of Your Recent Transactions" title="Transactions" />

            <TransactionsTable userId={user.id} />
        </Container>
    )
}
