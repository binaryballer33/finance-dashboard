"use client"

import type { RegisterRequest } from "@/types/forms/register"

import oAuthProviders from "@/types/forms/common"
import { defaultValuesRegisterRequest as defaultValues, RegisterRequestSchema } from "@/types/forms/register"

import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"
import { UserCircle } from "lucide-react"
import { toast } from "sonner"

import handleServerResponse from "@/lib/helper-functions/handleServerResponse"

import register from "@/actions/auth/register"

import routes from "@/routes/routes"

import Container from "@/components/base/container"
import FlexBetweenContainer from "@/components/base/flex-box/flex-between-container"
import FlexCenteredFullScreenContainer from "@/components/base/flex-box/flex-center-full-screen-container"
import FlexContainer from "@/components/base/flex-box/flex-container"
import Form from "@/components/forms/form-provider"
import FormDivider from "@/components/forms/form/form-divider"
import FormHead from "@/components/forms/form/form-head"
import FormLink from "@/components/forms/form/form-link"
import OAuthButton from "@/components/forms/form/form-oauth-button"
import ClearFormButton from "@/components/forms/form/form-reset-button"
import FormSubmitButton from "@/components/forms/form/form-submit-button"
import AuthFormInput from "@/components/forms/rhf-custom-input"

export default function RegisterView() {
    const { t } = useTranslation()

    const form = useForm<RegisterRequest>({ defaultValues, resolver: zodResolver(RegisterRequestSchema) })
    const { handleSubmit, reset: resetForm } = form

    const onSubmit = handleSubmit(async (formData) => {
        const response = await register(formData)
        // causes loading button to not display the loading indicator if called before the response is received
        resetForm()
        await handleServerResponse({ delay: 3500, redirectTo: routes.auth.login, response, toast })
    })

    return (
        <Form form={form} onSubmit={onSubmit}>
            <FlexCenteredFullScreenContainer>
                <Container maxWidth="sm">
                    <FormHead
                        description={t("Join Our Platform By Creating A New Account For Exclusive Access")}
                        icon={<UserCircle className="h-20 w-20 text-primary" />}
                        title={t("Create A New Account")}
                    />
                    <FlexContainer stackOn="mobile">
                        <OAuthButton provider={oAuthProviders.google} t={t} />
                        <OAuthButton provider={oAuthProviders.facebook} t={t} />
                    </FlexContainer>
                </Container>

                <FormDivider title="Or Register With Email Below" />

                <Container maxWidth="sm">
                    <FlexContainer stackOn="mobile">
                        <AuthFormInput inputName="firstName" label="First Name" />
                        <AuthFormInput inputName="lastName" label="Last Name" />
                    </FlexContainer>

                    <AuthFormInput inputName="email" label="Email" />
                    <AuthFormInput inputName="password" label="Password" showVisibilityToggle />
                    <AuthFormInput inputName="confirmPassword" label="Confirm Password" showVisibilityToggle />

                    <FlexBetweenContainer className="my-3" stackOn="mobile">
                        <FormLink
                            linkTitle={t("Sign In Here")}
                            linkTo={routes.auth.login}
                            title={t("Already A Member?")}
                        />
                        <ClearFormButton title={t("Clear Form")} />
                    </FlexBetweenContainer>
                    <FormSubmitButton loadingTitle={t("Creating Account...")} title={t("Create Account")} />
                </Container>
            </FlexCenteredFullScreenContainer>
        </Form>
    )
}
