import { appMetadata } from "@/lib/config"

import VerifyEmailView from "@/views/verify-email/verify-email-view"

export const metadata = appMetadata.verifyEmail

export default async function VerifyEmailPage() {
    return <VerifyEmailView />
}
