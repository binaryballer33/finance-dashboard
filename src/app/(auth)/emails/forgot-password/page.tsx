import type { Metadata } from "next/"

import { appMetadata } from "@/lib/config"

import ForgotPasswordView from "@/views/forgot-password/forgot-password-view"

export const metadata: Metadata = appMetadata.forgotPassword

export default async function ResetPasswordPage() {
    return <ForgotPasswordView />
}
