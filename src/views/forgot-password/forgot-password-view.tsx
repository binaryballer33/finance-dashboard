"use client"

import type { ForgotPassword } from "@/types/forms/forgot-password"

import { defaultValuesForgotPassword as defaultValues, ForgotPasswordSchema } from "@/types/forms/forgot-password"

import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from "lucide-react"
import { toast } from "sonner"

import handleServerResponse from "@/lib/helper-functions/handleServerResponse"

import forgotPassword from "@/actions/auth/forgot-password"

import routes from "@/routes/routes"

import Container from "@/components/base/container"
import FlexCenteredFullScreenContainer from "@/components/base/flex-box/flex-center-full-screen-container"
import Form from "@/components/forms/form-provider"
import FormHead from "@/components/forms/form/form-head"
import FormReturnLink from "@/components/forms/form/form-return-link"
import FormSubmitButton from "@/components/forms/form/form-submit-button"
import AuthFormInput from "@/components/forms/rhf-custom-input"

export default function ForgotPasswordView() {
    const { t } = useTranslation()

    const methods = useForm<ForgotPassword>({ defaultValues, resolver: zodResolver(ForgotPasswordSchema) })
    const { handleSubmit } = methods

    const onSubmit = handleSubmit(async (formData) => {
        const response = await forgotPassword(formData.email)
        await handleServerResponse({ redirectTo: routes.auth.login, response, toast })
    })

    return (
        <FlexCenteredFullScreenContainer minHeight="75dvh">
            <Container maxWidth="sm">
                <Form form={methods} onSubmit={onSubmit}>
                    <FormHead
                        description={t(`Enter The Email Address Associated With Your Account`)}
                        icon={<Lock className="h-20 w-20 text-primary" />}
                        title={t("Forgot Your Password?")}
                    />
                    <AuthFormInput<ForgotPassword>
                        className="my-2"
                        label={t("Email Address")}
                        name="email"
                        type="email"
                    />
                    <FormSubmitButton loadingTitle={t("Sending Email...")} title={t("Send Email")} />
                </Form>
                <FormReturnLink href={routes.auth.login} title={t("Return To Sign In")} />
            </Container>
        </FlexCenteredFullScreenContainer>
    )
}
