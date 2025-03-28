"use client"

import Link from "next/link"

import { Home, Menu } from "lucide-react"

import { dropdownItems, navigationItems } from "@/routes/navbar"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import MobileNavbarIcons from "./mobile-navbar-icons"
import MobileNavbarNestedDropdown from "./mobile-navbar-nested-dropdown"

export default function MobileNavbar() {
    return (
        <Sheet>
            <SheetTrigger asChild className="flex w-full justify-center md:hidden">
                <Button size="icon" variant="ghost">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>

            <SheetContent className="w-full py-14 sm:w-[500px] sm:max-w-[500px]" side="left">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu for mobile devices</SheetDescription>

                <nav className="flex flex-col space-y-4">
                    <MobileNavbarIcons className="mb-[100px]" />

                    <MobileNavbarNestedDropdown dropdownItems={dropdownItems} Icon={Home} title="Services" />

                    {/* navigation route links */}
                    {navigationItems.map((item) => (
                        <Link className="px-4 py-2 hover:bg-accent" href={item.route} key={item.title}>
                            <div className="flex items-center gap-2">
                                {item.icon && <item.icon className="h-4 w-4" />}
                                {item.title}
                            </div>
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
