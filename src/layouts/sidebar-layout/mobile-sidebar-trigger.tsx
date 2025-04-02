"use client"

import type { User } from "next-auth"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Bell, Menu } from "lucide-react"

import useMediaQuery from "@/hooks/use-media-query"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import navItems from "./sidebar-nav-items"
import SidebarUserInfoAndFeatures from "./sidebar-user-info-and-features"

type MobileSidebarTriggerProps = {
    user: User
}

export default function MobileSidebarTrigger(props: MobileSidebarTriggerProps) {
    const { user } = props

    const isMobile = useMediaQuery("(max-width: 900px)")
    const pathname = usePathname()

    const isActive = (href: string) => pathname === href

    return (
        isMobile && (
            <header className="mb-4 flex h-16 items-center gap-4 border-b bg-background px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="w-[280px] p-0" side="left">
                        <SheetDescription className="sr-only">
                            Navigation menu for quick access to main sections of the application
                        </SheetDescription>

                        <SheetTitle className="sr-only">Finance Dashboard</SheetTitle>

                        <div className="h-full bg-sidebar text-sidebar-foreground">
                            <div className="flex flex-col gap-0 py-4">
                                <div className="flex items-center px-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                                        <Bell className="h-4 w-4 text-primary-foreground" />
                                    </div>
                                    <span className="ml-2 text-lg font-semibold">Finance Dashboard</span>
                                </div>
                            </div>
                            <div className="flex h-5/6 flex-col justify-between gap-2 px-2 py-2">
                                <div>
                                    {navItems.map((item) => (
                                        <Link
                                            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                                                isActive(item.href)
                                                    ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                                                    : ""
                                            }`}
                                            href={item.href}
                                            key={item.title}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>

                                <SidebarUserInfoAndFeatures user={user} />
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </header>
        )
    )
}
