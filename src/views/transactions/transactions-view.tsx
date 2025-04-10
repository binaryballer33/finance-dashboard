"use client"

import useGetTransactionsByIdInfiniteQuery from "@/api/transactions/queries/use-get-transactions-by-id-infinite-query"
import * as dfd from "danfojs"

import useAuthUser from "@/hooks/use-auth-user"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"

import TransactionsAnalytics from "./blocks/analytics/transactions-analytics"
import TransactionsTable from "./blocks/table/transactions-table"

export default function TransactionsView() {
    const user = useAuthUser()

    // Call hooks unconditionally at the top level
    const infiniteQuery = useGetTransactionsByIdInfiniteQuery(user?.id ?? "")

    if (!user) return null

    // Flatten all pages of transactions into a single array
    const transactions = infiniteQuery.data?.pages.flatMap((page) => page) ?? []

    if (transactions.length > 0) {
        try {
            // Create a DataFrame from transactions
            const df = new dfd.DataFrame(transactions)

            // the amount of rows and columns [rows, columns] in the dataframe
            // console.log("DataFrame created here is the shape:", df.shape)
            // console.log("DataFrame columns here are the columns:", df.columns)

            if (df.columns.includes("amount") && df.columns.includes("category")) {
                // Calculate spending by category
                const categoryGroup = df.groupby(["category"])
                const spendingByCategory = categoryGroup.col(["amount"]).sum()
                // console.log("Spending by category:", spendingByCategory.print())

                // access the data in the spedningByCategory dataframe as an array, this is data you can use in React
                const spendingByCategoryArray = dfd.toJSON(spendingByCategory, { format: "column" })
                console.log("Spending by category array:", spendingByCategoryArray)

                // get the total spending
                const totalSpending = df.column("amount").sum()
                console.log("Total spending:", totalSpending)

                // Get monthly spending trends if date column exists
                // if (df.columns.includes("date")) {
                //     df.addColumn(
                //         "month",
                //         df.column("date").map((date) => {
                //             try {
                //                 return new Date(date).toLocaleString("default", { month: "long" })
                //             } catch (e) {
                //                 console.error("Date parsing error:", e)
                //                 return "Unknown"
                //             }
                //         }),
                //     )
                //     const monthlyGroup = df.groupby(["month"])
                //     const monthlySpending = monthlyGroup.col(["amount"]).sum()
                //     console.log("Monthly spending:", monthlySpending.print())
                // }

                // Find largest transactions
                const sortedByAmount = df.sortValues("amount", { ascending: false })
                const top5Transactions = sortedByAmount.head(5)
                // console.log("Top 5 largest transactions:", top5Transactions.print())
                const top5TransactionsArray = dfd.toJSON(top5Transactions, { format: "column" })
                console.log("Top 5 largest transactions:", top5TransactionsArray)
            }
        } catch (error) {
            console.error("Error in Danfojs processing:", error)
        }
    }

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="All Of Your Recent Transactions" title="Transactions" />

            <TransactionsTable infiniteQuery={infiniteQuery} userId={user.id} />

            {/* TODO: go chop this component up into smaller components , make it more modular and tweak it to your liking */}
            <TransactionsAnalytics />
        </Container>
    )
}
