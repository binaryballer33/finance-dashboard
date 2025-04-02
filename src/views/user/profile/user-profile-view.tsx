"use client"

import useAuthUser from "@/hooks/useAuthUser"

import PlaceholderBox from "@/components/base/placeholder-box"
import { H1 } from "@/components/base/typography"

export default function UserProfileView() {
    const user = useAuthUser()
    if (!user) return null

    return (
        <div className="w-full">
            <H1 className="my-4 text-center">Welcome Back {user.firstName}</H1>
            <PlaceholderBox className="mx-auto w-5/6" height={700} title={user.email} />
        </div>
    )
}
