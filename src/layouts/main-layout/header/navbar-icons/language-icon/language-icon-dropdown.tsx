"use client"

import { useCallback } from "react"

import ReactCountryFlag from "react-country-flag"
import { useTranslation } from "react-i18next"

import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Language = "ae" | "br" | "cn" | "de" | "en" | "es" | "fr" | "pt"

type LanguageOptions = {
    [key in Language]: {
        icon: string
        label: string
    }
}

const languages: Record<Language, string> = {
    ae: "AE",
    br: "BR",
    cn: "CN",
    de: "DE",
    en: "US",
    es: "ES",
    fr: "FR",
    pt: "PT",
}

const languageOptions: LanguageOptions = {
    ae: {
        icon: "AE",
        label: "Arabic",
    },
    br: {
        icon: "BR",
        label: "Brazil",
    },
    cn: {
        icon: "CN",
        label: "Chinese",
    },
    de: {
        icon: "DE",
        label: "German",
    },
    en: {
        icon: "US",
        label: "English",
    },
    es: {
        icon: "ES",
        label: "Spanish",
    },
    fr: {
        icon: "FR",
        label: "French",
    },
    pt: {
        icon: "PT",
        label: "Portuguese",
    },
}

type LanguageDropdownProps = {
    color?: "error" | "info" | "inherit" | "primary" | "secondary" | "success" | "warning"
}

export default function LanguageDropdown(props: LanguageDropdownProps) {
    const { color = "inherit" } = props
    const { i18n, t } = useTranslation()
    const flag = languages[i18n.language as Language]

    const handleChange = useCallback(
        async (language: Language): Promise<void> => {
            await i18n.changeLanguage(language)
            const message = t("Language changed to English")
            toast.success(message, {
                position: "bottom-center",
            })
        },
        [i18n, t],
    )

    return (
        <TooltipProvider>
            <Tooltip>
                <DropdownMenu>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className={cn(
                                    "h-9 w-9",
                                    color === "primary" && "text-primary",
                                    color === "secondary" && "text-secondary",
                                    color === "success" && "text-success",
                                    color === "error" && "text-destructive",
                                    color === "warning" && "text-warning",
                                    color === "info" && "text-info",
                                )}
                                size="icon"
                                variant="ghost"
                            >
                                <ReactCountryFlag countryCode={flag} svg />
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>{t("Switch Language")}</TooltipContent>
                    <DropdownMenuContent align="end">
                        {(Object.keys(languageOptions) as Language[]).map((language) => {
                            const option = languageOptions[language]
                            return (
                                <DropdownMenuItem
                                    className={cn(
                                        "flex cursor-pointer items-center gap-2",
                                        i18n.language === language && "bg-accent",
                                    )}
                                    key={language}
                                    onClick={() => handleChange(language)}
                                >
                                    <ReactCountryFlag className="h-4 w-4" countryCode={option.icon} svg />
                                    <span>{option.label}</span>
                                </DropdownMenuItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </Tooltip>
        </TooltipProvider>
    )
}
