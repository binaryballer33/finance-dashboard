import type { Metadata } from "next/"

import { appMetadata } from "@/lib/config"

import ResetPasswordView from "@/views/reset-password/reset-password-view"

export const metadata: Metadata = appMetadata.resetPassword

export default async function ResetPasswordPage() {
    return <ResetPasswordView />
}
