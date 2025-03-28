import { type ReactNode } from "react"

import ClientProvidersLayout from "@/layouts/providers/client-providers/client-providers-layout"
import ServerProvidersLayout from "@/layouts/providers/server-providers/server-providers-layout"

type LayoutProps = {
    children: ReactNode
}

export default function Providers({ children }: LayoutProps) {
    return (
        <ClientProvidersLayout>
            <ServerProvidersLayout>{children}</ServerProvidersLayout>
        </ClientProvidersLayout>
    )
}
