import type { User } from "next-auth"

import { useCallback } from "react"

import { LogOut } from "lucide-react"
import { toast } from "sonner"

import handleServerResponse from "@/lib/helper-functions/handleServerResponse"

import signOut from "@/actions/auth/sign-out"

import routes from "@/routes/routes"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import ThemeModeToggler from "./theme-mode-toggler"

type SidebarUserInfoAndFeaturesProps = {
    user: User
}

export default function SidebarUserInfoAndFeatures(props: SidebarUserInfoAndFeaturesProps) {
    const { user } = props

    const handleSignOut = useCallback(async (): Promise<void> => {
        const response = await signOut()
        await handleServerResponse({ redirectTo: routes.auth.signOut, response, toast })
    }, [])

    const LogoutButton = (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button className="h-8 w-8" onClick={handleSignOut} variant="ghost">
                        <LogOut className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Logout</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )

    const UserAvatar = (
        <Avatar className="h-8 w-8">
            <AvatarImage alt="Avatar" src={user?.imageUrl ?? ""} />
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
    )

    return (
        <div className="flex flex-col items-center gap-2 p-4 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:justify-center">
            {/* Normal view: Theme > Avatar > Logout */}
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                {/* Theme Mode Toggle */}
                <ThemeModeToggler />

                {/* User avatar */}
                {UserAvatar}

                {/* Logout button */}
                {LogoutButton}
            </div>

            {/* Collapsed view: Theme > Logout > Avatar */}
            <div className="hidden items-center gap-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col">
                {/* Theme Mode Toggle */}
                <ThemeModeToggler />

                {/* Logout button before avatar when collapsed */}
                {LogoutButton}

                {/* User avatar */}
                {UserAvatar}
            </div>

            {/* User info */}
            {user?.firstName && user?.lastName && user?.email && (
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-medium">
                        {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
            )}
        </div>
    )
}
