"use client"

import { Bell, Menu } from "lucide-react"

import useMediaQuery from "@/hooks/use-media-query"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import navItems from "./temp-nav-items"

export default function MobileSidebarTrigger() {
    const isMobile = useMediaQuery("(max-width: 900px)")

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
                            <div className="px-2 py-2">
                                {navItems.map((item) => (
                                    <a
                                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                                            item.isActive
                                                ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                                                : ""
                                        }`}
                                        href={item.href}
                                        key={item.title}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </header>
        )
    )
}
