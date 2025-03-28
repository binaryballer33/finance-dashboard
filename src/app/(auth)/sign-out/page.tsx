import { appMetadata } from "@/lib/config"

import SignOutView from "@/views/sign-out/sign-out-view"

export const metadata = appMetadata.signOut

export default async function SignOutPage() {
    return <SignOutView />
}
