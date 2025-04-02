"use client"

import { useTranslation } from "react-i18next"

import useRedirectIfStale from "@/hooks/use-redirect-if-stale"

import routes from "@/routes/routes"

import FlexCenteredFullScreenContainer from "@/components/base/flex-box/flex-center-full-screen-container"
import FormLink from "@/components/forms/form/form-link"

function SignOutView() {
    const { t } = useTranslation()
    useRedirectIfStale(routes.auth.login, 1000) // redirect if stale on page

    return (
        <FlexCenteredFullScreenContainer minHeight="75dvh">
            <p className="text-base">{t("You've Been Signed Out Successfully")}</p>
            <FormLink linkTitle={t("Go Back To The Home Page")} linkTo={routes.user.home} />
        </FlexCenteredFullScreenContainer>
    )
}

export default SignOutView
