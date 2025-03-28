import { useTranslation } from "react-i18next"

import { Facebook, Github, Instagram, Twitter, Youtube } from "lucide-react"

import routes from "./routes"

// footer items with translations
export const useFooterNavigationItems = () => {
    const { t } = useTranslation()

    return {
        company: [
            { href: routes.dummy, name: t("About") },
            { href: routes.dummy, name: t("Blog") },
            { href: routes.dummy, name: t("Jobs") },
            { href: routes.dummy, name: t("Press") },
            { href: routes.dummy, name: t("Partners") },
        ],
        legal: [
            { href: routes.dummy, name: t("Claim") },
            { href: routes.dummy, name: t("Privacy") },
            { href: routes.dummy, name: t("Terms") },
        ],
        social: [
            { href: routes.dummy, icon: Facebook, name: t("Facebook") },
            { href: routes.dummy, icon: Instagram, name: t("Instagram") },
            { href: routes.dummy, icon: Twitter, name: t("Twitter") },
            { href: routes.dummy, icon: Github, name: t("GitHub") },
            { href: routes.dummy, icon: Youtube, name: t("YouTube") },
        ],
        solutions: [
            { href: routes.dummy, name: t("Marketing") },
            { href: routes.dummy, name: t("Analytics") },
            { href: routes.dummy, name: t("Commerce") },
            { href: routes.dummy, name: t("Insights") },
        ],
        support: [
            { href: routes.dummy, name: t("Pricing") },
            { href: routes.dummy, name: t("Documentation") },
            { href: routes.dummy, name: t("Guides") },
            { href: routes.dummy, name: t("API Status") },
        ],
    }
}

// footer items without translations
export const footerNavigationItems = {
    company: [
        { href: routes.dummy, name: "About" },
        { href: routes.dummy, name: "Blog" },
        { href: routes.dummy, name: "Jobs" },
        { href: routes.dummy, name: "Press" },
        { href: routes.dummy, name: "Partners" },
    ],
    legal: [
        { href: routes.dummy, name: "Claim" },
        { href: routes.dummy, name: "Privacy" },
        { href: routes.dummy, name: "Terms" },
    ],
    social: [
        { href: routes.dummy, icon: Facebook, name: "Facebook" },
        { href: routes.dummy, icon: Instagram, name: "Instagram" },
        { href: routes.dummy, icon: Twitter, name: "Twitter" },
        { href: routes.dummy, icon: Github, name: "GitHub" },
        { href: routes.dummy, icon: Youtube, name: "YouTube" },
    ],
    solutions: [
        { href: routes.dummy, name: "Marketing" },
        { href: routes.dummy, name: "Analytics" },
        { href: routes.dummy, name: "Commerce" },
        { href: routes.dummy, name: "Insights" },
    ],
    support: [
        { href: routes.dummy, name: "Pricing" },
        { href: routes.dummy, name: "Documentation" },
        { href: routes.dummy, name: "Guides" },
        { href: routes.dummy, name: "API Status" },
    ],
}
