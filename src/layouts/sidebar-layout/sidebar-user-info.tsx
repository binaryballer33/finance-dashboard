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

type SidebarUserInfoProps = {
    user: User
}

export default function SidebarUserInfo(props: SidebarUserInfoProps) {
    const { user } = props

    const handleSignOut = useCallback(async (): Promise<void> => {
        const response = await signOut()
        await handleServerResponse({ redirectTo: routes.auth.signOut, response, toast })
    }, [])

    return (
        <div className="flex flex-col items-center gap-2 p-4 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:justify-center">
            <div className="flex items-center gap-2">
                {/* User avatar */}
                <Avatar className="h-8 w-8">
                    <AvatarImage alt="Avatar" src={user?.imageUrl ?? ""} />
                    <AvatarFallback>
                        {user?.firstName?.charAt(0)}
                        {user?.lastName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                {/* Logout button */}
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
