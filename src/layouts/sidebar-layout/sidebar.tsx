"use client"

import type { User } from "next-auth"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { useCallback, useEffect, useRef, useState } from "react"

import { DollarSign } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"

import navItems from "./sidebar-nav-items"
import SidebarUserInfoAndFeatures from "./sidebar-user-info-and-features"

type SidebarProps = {
    user: User
}

export default function AppSidebar(props: SidebarProps) {
    const { user } = props

    const { open, setOpen } = useSidebar()
    const [hoverOpen, setHoverOpen] = useState(false)
    const [isPinned, setIsPinned] = useState(false)
    const pathname = usePathname()
    const isActive = (href: string) => pathname === href

    // Use a ref to track hover state to avoid unnecessary renders
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Handle hover behavior with debounce
    const handleMouseEnter = useCallback(() => {
        if (!open && !isPinned) {
            // Clear any existing timeout
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current)
            }

            // Set a new timeout
            hoverTimeoutRef.current = setTimeout(() => {
                setHoverOpen(true)
                setOpen(true)
                hoverTimeoutRef.current = null
            }, 10)
        }
    }, [open, isPinned, setOpen])

    // Handle mouse leave behavior with debounce
    const handleMouseLeave = useCallback(() => {
        if (hoverOpen && !isPinned) {
            // Clear any existing timeout
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current)
            }

            // Set a new timeout
            hoverTimeoutRef.current = setTimeout(() => {
                setHoverOpen(false)
                setOpen(false)
                hoverTimeoutRef.current = null
            }, 150)
        }
    }, [hoverOpen, isPinned, setOpen])

    // Clean up timeouts on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current)
            }
        }
    }, [])

    // Toggle pinned state
    const togglePin = useCallback(() => {
        setIsPinned(!isPinned)
        setOpen(!isPinned)
        setHoverOpen(false)
    }, [isPinned, setOpen])

    // Desktop sidebar
    return (
        <Sidebar
            className="border-r"
            collapsible="icon"
            key="app-sidebar"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <SidebarHeader className="flex flex-col gap-0 py-4">
                <div className="flex items-center justify-center px-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                        <DollarSign className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="ml-2 text-sm font-semibold group-data-[collapsible=icon]:hidden">
                        Finance Dashboard
                    </span>
                    <Button
                        className="ml-auto h-8 w-8 group-data-[collapsible=icon]:hidden"
                        onClick={togglePin}
                        size="icon"
                        title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
                        variant="ghost"
                    >
                        <div
                            className={cn(
                                "h-1.5 w-1.5 rounded-full transition-colors",
                                isPinned ? "bg-primary" : "bg-muted-foreground",
                            )}
                        />
                    </Button>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu className="space-y-4">
                    {/* Nav items */}
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className="pl-6 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:!size-auto group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!p-0"
                                isActive={isActive(item.href)}
                                tooltip={item.title}
                            >
                                <Link
                                    className="flex w-full items-center group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:justify-center"
                                    href={item.href}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarUserInfoAndFeatures user={user} />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
