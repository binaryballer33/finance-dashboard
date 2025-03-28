import Link from "next/link"

import { Lock } from "lucide-react"

import { cn } from "@/lib/utils"

import useCheckPathname from "@/hooks/use-check-pathname"

import { notLoggedInAuthItems } from "@/routes/navbar"
import routes from "@/routes/routes"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function NotLoggedInAuthIcons() {
    const { isLinkActive, pathname } = useCheckPathname()
    const isAuthPage = routes.authRoutes.includes(pathname)

    return (
        <NavigationMenu
            className={cn("w-auto hover:border-b-2 hover:border-primary", isAuthPage && "border-b-2 border-primary")}
        >
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="p-2">
                        <Link href={routes.auth.login}>
                            <Lock className="h-4 w-4 text-primary" />
                        </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[225px]">
                        <div className="flex flex-col p-2">
                            {notLoggedInAuthItems.map((item) => (
                                // create the navigation menu items
                                <Link
                                    className={cn(
                                        "flex h-12 cursor-pointer items-center justify-between px-4 py-2 hover:bg-secondary/45",
                                        isLinkActive(item.route) && "bg-primary",
                                    )}
                                    href={item.route}
                                    key={item.title}
                                >
                                    <span className="text-base">{item.title}</span>
                                    <item.icon
                                        className={cn(
                                            "h-6 w-6 text-primary",
                                            isLinkActive(item.route) && "text-primary-foreground",
                                        )}
                                    />
                                </Link>
                            ))}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
