"use client"

import type { VerifyEmail } from "@/types/forms/verify-email"

import { defaultValuesVerifyEmail as defaultValues, VerifyEmailSchema } from "@/types/forms/verify-email"

import { useSearchParams } from "next/navigation"

import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { toast } from "sonner"

import handleServerResponse from "@/lib/helper-functions/handleServerResponse"

import createVerificationToken from "@/actions/auth/tokens/verification-token/create-verification-token"
import verifyAccountEmail from "@/actions/auth/verify-account-email"
import sendAccountVerificationEmail from "@/actions/emails/send-account-verification-email"

import routes from "@/routes/routes"

import Container from "@/components/base/container"
import FlexCenteredFullScreenContainer from "@/components/base/flex-box/flex-center-full-screen-container"
import Field from "@/components/forms/fields"
import Form from "@/components/forms/form-provider"
import FormHead from "@/components/forms/form/form-head"
import FormResendCode from "@/components/forms/form/form-resend-code"
import FormReturnLink from "@/components/forms/form/form-return-link"
import FormSubmitButton from "@/components/forms/form/form-submit-button"
import AuthFormInput from "@/components/forms/rhf-custom-input"

export default function VerifyEmailView() {
    const { t } = useTranslation()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    const methods = useForm<VerifyEmail>({ defaultValues, resolver: zodResolver(VerifyEmailSchema) })
    const { handleSubmit } = methods

    const onSubmit = handleSubmit(async (formData) => {
        const response = await verifyAccountEmail({ ...formData, token: token! })
        await handleServerResponse({ closeTab: true, response, toast })
    })

    const onResendCode = async () => {
        // create verification token and make sure it was created
        const tokenResponse = await createVerificationToken(email!)
        if (!("token" in tokenResponse)) return tokenResponse

        // send the verification email to the newly created user and make sure it was sent
        const emailResponse = await sendAccountVerificationEmail(tokenResponse.token)
        if (!("email" in emailResponse)) return emailResponse

        return handleServerResponse({ response: emailResponse, toast })
    }

    return (
        <Form form={methods} onSubmit={onSubmit}>
            <FlexCenteredFullScreenContainer minHeight="80dvh">
                <Container maxWidth="sm">
                    <FormHead
                        description={t(
                            `We've Emailed A 6-digit Confirmation Code. \nPlease Enter The Code In The Box Below To Verify Your Email.`,
                        )}
                        icon={<Mail className="h-20 w-20 text-primary" />}
                        title={t("Please Check Your Email!")}
                    />
                    <div className="flex flex-col gap-2">
                        <AuthFormInput inputName="email" label={t("Email Address")} />
                        <Field.Code name="sixDigitCode" />
                        <FormSubmitButton loadingTitle={t("Verifying Code...")} title={t("Verify")} />
                    </div>
                    <FormResendCode disabled={false} onResendCode={onResendCode} value={0} />
                    <FormReturnLink href={routes.auth.login} title={t("Return To Sign In")} />
                </Container>
            </FlexCenteredFullScreenContainer>
        </Form>
    )
}
