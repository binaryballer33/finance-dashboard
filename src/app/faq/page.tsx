import { appMetadata } from "@/lib/config"

import FAQView from "@/views/faq/faq-view"

export const metadata = appMetadata.faq

export default async function FAQPage() {
    return <FAQView />
}
