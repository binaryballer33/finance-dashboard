"use client"

import type { ReactNode } from "react"

import { usePathname } from "next/navigation"

import { memo, useEffect } from "react"

import useAuthUser from "@/hooks/use-auth-user"

import routes from "@/routes/routes"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import FlexCenteredFullScreenContainer from "@/components/base/flex-box/flex-center-full-screen-container"

import MobileSidebarTrigger from "./mobile-sidebar-trigger"
import AppSidebar from "./sidebar"
import ThemeModeToggler from "./theme-mode-toggler"

type SidebarLayoutProps = {
    children: ReactNode
}

// Memoize the components to prevent unnecessary re-renders
const Sidebar = memo(AppSidebar)

export default function SidebarLayout(props: SidebarLayoutProps) {
    const { children } = props

    // Get the user from the session
    const user = useAuthUser()

    // Get the pathname to check if the route is an auth route
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

    // If the user is not authenticated, don't render the sidebar

    // If the route is an auth route, don't render the sidebar
    if (!user || isAuthRoute) {
        return (
            <FlexCenteredFullScreenContainer minHeight="100dvh">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="absolute right-4 top-4">
                        <ThemeModeToggler />
                    </div>

                    {children}
                </div>
            </FlexCenteredFullScreenContainer>
        )
    }

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden">
                <Sidebar user={user} />
                <SidebarInset className="flex min-w-0 flex-1 flex-col">
                    <MobileSidebarTrigger user={user} />
                    <div className="flex-1 overflow-auto">{children}</div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
