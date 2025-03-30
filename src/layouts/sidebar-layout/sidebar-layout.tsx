"use client"

import type { ReactNode } from "react"

import { memo, useEffect } from "react"

import { SidebarInset } from "@/components/ui/sidebar"

import MobileSidebarTrigger from "./mobile-sidebar-trigger"
import AppSidebar from "./sidebar"

type SidebarLayoutProps = {
    children: ReactNode
}

// Memoize the components to prevent unnecessary re-renders
const Sidebar = memo(AppSidebar)

export default function SidebarLayout(props: SidebarLayoutProps) {
    const { children } = props

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

    return (
        <>
            <Sidebar />

            <SidebarInset className="flex flex-col">
                <MobileSidebarTrigger />
                {children}
            </SidebarInset>
        </>
    )
}
