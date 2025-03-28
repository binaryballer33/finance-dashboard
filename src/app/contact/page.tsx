import { appMetadata } from "@/lib/config"

import ContactView from "@/views/contact/contact-view"

export const metadata = appMetadata.contact

export default async function ContactPage() {
    return <ContactView />
}
