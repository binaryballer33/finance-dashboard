import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import { H5 } from "@/components/base/typography"

export default function SavingsView() {
    return (
        <Container maxWidth="full">
            <PageHeading bottomText="Your Personal Page For Savings" title="Savings" />

            <H5 className="mt-4 text-2xl font-bold">Your Monthly Savings</H5>
        </Container>
    )
}
