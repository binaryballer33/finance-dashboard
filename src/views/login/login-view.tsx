"use client"

import type { LoginRequest } from "@/types/forms/login"

import { defaultValuesLoginRequest as defaultValues, LoginRequestSchema } from "@/types/forms/login"

import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"
import { parseAsBoolean, useQueryState } from "nuqs"
import { toast } from "sonner"

import handleServerResponse from "@/lib/helper-functions/handleServerResponse"

import login from "@/actions/auth/login"

import routes from "@/routes/routes"

import LoginForm from "@/views/login/blocks/login-form"
import TwoFactorCode from "@/views/login/blocks/two-factor-code"

import Form from "@/components/forms/form-provider"

export default function LoginView() {
    const { t } = useTranslation()

    const form = useForm<LoginRequest>({ defaultValues, resolver: zodResolver(LoginRequestSchema) })

    const { handleSubmit } = form

    const [showTwoFactorInput, setShowTwoFactorInput] = useQueryState(
        "showTwoFactorInput",
        parseAsBoolean.withDefault(false),
    )

    const onSubmit = handleSubmit(async (formData) => {
        const response = await login(formData)

        // if a 2FA Token is returned from login, set the twoFactorEnabled state to true to display 2FA input
        if ("token" in response) {
            await setShowTwoFactorInput(true)
        } else {
            // if no 2FA Token, user is not using 2FA
            const redirectLocation = "error" in response ? "" : routes.user.home
            await handleServerResponse({ redirectTo: redirectLocation, response, toast })
        }
    })

    return (
        <Form form={form} onSubmit={onSubmit}>
            {showTwoFactorInput ? <TwoFactorCode t={t} /> : <LoginForm t={t} />}
        </Form>
    )
}
