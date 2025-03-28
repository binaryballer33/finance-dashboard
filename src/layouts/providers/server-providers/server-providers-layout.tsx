import { type ReactNode } from "react"

import { auth } from "@/auth/auth"
import { SessionProvider } from "next-auth/react"

type LayoutProps = {
    children: ReactNode
}

export default async function ServerProviders({ children }: LayoutProps) {
    const session = await auth()
    return <SessionProvider session={session}>{children}</SessionProvider>
}
