import type { Viewport } from "next/"
import type { ReactNode } from "react"

import Providers from "@/layouts/providers/providers-layout"
import SidebarLayout from "@/layouts/sidebar-layout/sidebar-layout"

import NProgress from "@/components/base/nprogress"

export const dynamic = "force-dynamic"

export const viewport: Viewport = {
    colorScheme: "dark",
    initialScale: 1,
    width: "device-width",
}

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>
                    <SidebarLayout>{children}</SidebarLayout>
                    <NProgress />
                </Providers>
            </body>
        </html>
    )
}
