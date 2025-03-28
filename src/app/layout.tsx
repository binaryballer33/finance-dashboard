import type { Viewport } from "next/"
import type { ReactNode } from "react"

import MainLayout from "@/layouts/main-layout"
import Providers from "@/layouts/providers/providers-layout"

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

export default async function Layout({ children }: LayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>
                    <MainLayout>
                        {children}
                        <NProgress />
                    </MainLayout>
                </Providers>
            </body>
        </html>
    )
}
