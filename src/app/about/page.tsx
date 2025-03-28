import { appMetadata } from "@/lib/config"

import AboutView from "@/views/about/about-view"

export const metadata = appMetadata.about

export default async function AboutPage() {
    return <AboutView />
}
