"use client"

import useAuthUser from "@/hooks/use-auth-user"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import { H5 } from "@/components/base/typography"

import ExpensesTable from "./blocks/income-table/expenses-table"

export default function ExpensesView() {
    const user = useAuthUser()
    if (!user) return null

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="Your Personal Page For Expenses" title="Expenses" />

            <H5 className="mt-4 text-2xl font-bold">Your Monthly Recurring Expenses</H5>
            <ExpensesTable userId={user.id} />
        </Container>
    )
}
