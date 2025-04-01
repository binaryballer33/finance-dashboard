"use client"

import { type ReactNode } from "react"

import ReactQueryClientProvider from "@/layouts/providers/client-providers/query-client-provider"
import ThemeProvider from "@/layouts/providers/client-providers/theme-provider"
import { NuqsAdapter } from "nuqs/adapters/next/app"

type LayoutProps = {
    children: ReactNode
}

export default function ClientProviders({ children }: LayoutProps) {
    return (
        <ThemeProvider>
            <NuqsAdapter>
                <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
            </NuqsAdapter>
        </ThemeProvider>
    )
}
