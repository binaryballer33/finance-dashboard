"use client"

import type { ReactNode } from "react"

import { usePathname } from "next/navigation"

import { memo, useEffect } from "react"

import routes from "@/routes/routes"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import FlexCenteredFullScreenContainer from "@/components/base/flex-box/flex-center-full-screen-container"

import MobileSidebarTrigger from "./mobile-sidebar-trigger"
import AppSidebar from "./sidebar"

type SidebarLayoutProps = {
    children: ReactNode
}

// Memoize the components to prevent unnecessary re-renders
const Sidebar = memo(AppSidebar)

export default function SidebarLayout(props: SidebarLayoutProps) {
    const { children } = props

    const pathname = usePathname()
    const isAuthRoute = routes.authRoutes.includes(pathname)

    // Add a global error handler for ResizeObserver errors
    useEffect(() => {
        // This prevents the ResizeObserver loop limit exceeded error
        const errorHandler = (e: ErrorEvent) => {
            if (e.message.includes("ResizeObserver") || e.error?.message?.includes("ResizeObserver")) {
                e.stopImmediatePropagation()
            }
        }

        window.addEventListener("error", errorHandler)
        return () => window.removeEventListener("error", errorHandler)
    }, [])

    // If the route is an auth route, don't render the sidebar
    if (isAuthRoute) {
        return <FlexCenteredFullScreenContainer minHeight="100dvh">{children}</FlexCenteredFullScreenContainer>
    }

    return (
        <SidebarProvider>
            <Sidebar />

            <SidebarInset className="flex flex-col">
                <MobileSidebarTrigger />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
