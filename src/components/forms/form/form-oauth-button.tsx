"use client"

import type { OAuthProvider } from "@/types/forms/common"
import type { TFunction } from "i18next"

import { useSearchParams } from "next/navigation"

import { useCallback } from "react"

import { useFormContext } from "react-hook-form"

import { toast } from "sonner"

import { signIn } from "next-auth/react"

import { cn } from "@/lib/utils"

import routes from "@/routes/routes"

import { Button } from "@/components/ui/button"

type OAuthButtonProps = {
    className?: string
    provider: OAuthProvider
    t: TFunction<"translation", undefined>
}

export default function OAuthButton(props: OAuthButtonProps) {
    const { className, provider, t } = props
    const { icon: Icon } = provider

    const {
        formState: { isSubmitting },
    } = useFormContext()

    const searchParams = useSearchParams()

    const loginError = searchParams.get("error")
    const oauthLoginError =
        loginError === "OAuthAccountNotLinked" ? "Email Already In Use With A Different Provider" : null

    const onAuth = useCallback(
        async (oauthProvider: OAuthProvider["id"]): Promise<void> => {
            await signIn(oauthProvider, { redirectTo: routes.nextAuth.defaultLoginRedirect })
            if (loginError) toast.error(oauthLoginError)
        },
        [loginError, oauthLoginError],
    )

    return (
        <Button
            className={cn("w-full border-primary/30 text-base font-normal hover:bg-primary/10", className)}
            disabled={isSubmitting}
            onClick={() => onAuth(provider.id).catch(() => {})}
            type="button"
            variant="outline"
        >
            <Icon className="mr-2 h-5 w-5" />
            {t(`Access With ${provider.name}`)}
        </Button>
    )
}
