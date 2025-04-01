import type { TFunction } from "i18next"

import oAuthProviders from "@/types/forms/common"

import { LogIn } from "lucide-react"

import routes from "@/routes/routes"

import Container from "@/components/base/container"
import FlexBetweenContainer from "@/components/base/flex-box/flex-between-container"
import FlexCenteredFullScreenContainer from "@/components/base/flex-box/flex-center-full-screen-container"
import FlexContainer from "@/components/base/flex-box/flex-container"
import { H1 } from "@/components/base/typography"
import FormDivider from "@/components/forms/form/form-divider"
import FormHead from "@/components/forms/form/form-head"
import FormLink from "@/components/forms/form/form-link"
import OAuthButton from "@/components/forms/form/form-oauth-button"
import ClearFormButton from "@/components/forms/form/form-reset-button"
import FormSubmitButton from "@/components/forms/form/form-submit-button"
import AuthFormInput from "@/components/forms/rhf-custom-input"

type LoginFormProps = {
    t: TFunction<"translation", undefined>
}

export default function LoginForm(props: LoginFormProps) {
    const { t } = props

    return (
        <FlexCenteredFullScreenContainer minHeight="85dvh">
            <H1 className="mb-4 text-center">Finance Dashboard</H1>

            <FormHead
                description="Login To Your Account For Full Access"
                icon={<LogIn className="h-20 w-20 text-primary" />}
                title="Sign In"
            />

            <Container maxWidth="sm">
                <FlexContainer stackOn="mobile">
                    <OAuthButton provider={oAuthProviders.google} t={t} />
                    <OAuthButton provider={oAuthProviders.facebook} t={t} />
                </FlexContainer>
            </Container>

            <FormDivider title={t("Or Sign In With Email Below")} />

            <Container maxWidth="sm">
                <AuthFormInput inputName="email" label="Email" />
                <AuthFormInput inputName="password" label="Password" showVisibilityToggle />

                <FlexBetweenContainer>
                    <FormLink linkTitle={t("Forgot Password?")} linkTo={routes.auth.forgotPassword} />
                    <ClearFormButton title={t("Clear Form")} />
                </FlexBetweenContainer>

                <FormSubmitButton loadingTitle={t("Signing In...")} title={t("Sign In")} />
                <FormLink linkTitle={t("Sign Up")} linkTo={routes.auth.register} title={t("Not A Member Yet?")} />
            </Container>
        </FlexCenteredFullScreenContainer>
    )
}
