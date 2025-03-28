import type { NavBarItemWithIcon } from "@/types/navbar-item"
import type { LucideIcon } from "lucide-react"
import type { IconType } from "react-icons"

import Link from "next/link"

import { Fragment } from "react"

import { cn } from "@/lib/utils"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type MobileNavbarNestedDropdownProps = {
    className?: string
    dropdownItems: NavBarItemWithIcon[]
    Icon?: IconType | LucideIcon
    title: string
}

export default function MobileNavbarNestedDropdown(props: MobileNavbarNestedDropdownProps) {
    const { className, dropdownItems, Icon, title } = props

    return (
        <Accordion className={cn("pl-4", className)} collapsible type="single">
            <AccordionItem value={title}>
                <AccordionTrigger className="hover:bg-accent hover:no-underline">
                    <div className="flex w-full items-center gap-2">
                        {Icon && <Icon className="h-4 w-4" />}
                        {title}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col space-y-2">
                        {dropdownItems.map((item) => (
                            <Fragment key={item.title}>
                                {/* navigation route link */}
                                {!item.subMenu && (
                                    <Link className="px-6 py-2 hover:bg-accent" href={item.route} key={item.title}>
                                        <div className="flex items-center gap-2">
                                            {item.icon && <item.icon className="h-4 w-4" />}
                                            {item.title}
                                        </div>
                                    </Link>
                                )}

                                {/* nested dropdown menu */}
                                {item.subMenu && (
                                    <Accordion collapsible type="single">
                                        <AccordionItem value={item.title}>
                                            <AccordionTrigger className="px-6 hover:bg-accent hover:no-underline">
                                                <div className="flex items-center gap-2">
                                                    {item.icon && <item.icon className="h-4 w-4" />}
                                                    {item.title}
                                                </div>
                                            </AccordionTrigger>

                                            <AccordionContent className="pl-8">
                                                <div className="flex flex-col space-y-2">
                                                    {item.subMenu.map((subItem) => (
                                                        <Link
                                                            className="px-6 py-2 hover:bg-accent"
                                                            href={subItem.route}
                                                            key={subItem.title}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                                                {subItem.title}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
