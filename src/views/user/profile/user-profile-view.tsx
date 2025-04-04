"use client"

import useAuthUser from "@/hooks/use-auth-user"

import { H1 } from "@/components/base/typography"

import UserAccountSettingsView from "./blocks/user-account-settings"

export default function UserProfileView() {
    const user = useAuthUser()
    if (!user) return null

    return (
        <div className="w-full">
            <H1 className="my-4 text-center">Welcome Back {user.firstName}</H1>

            <UserAccountSettingsView />
        </div>
    )
}
