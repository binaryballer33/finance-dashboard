"use server"

import { auth } from "@/auth/auth"

export default async function getCurrentUser() {
    const session = await auth()

    if (!session?.user) {
        console.error("No User Authenticated When Getting Current User")
        return null
    }

    return session.user
}
