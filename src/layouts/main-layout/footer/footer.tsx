"use client"

import { type FC } from "react"

import { useTranslation } from "react-i18next"

import { FaReact } from "react-icons/fa"

import { footerNavigationItems } from "@/routes/footer"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const Footer: FC = () => {
    const { t } = useTranslation()

    return (
        <footer>
            <div className="py-4">
                {/* Footer Content */}
                <div className="mx-auto w-[95%]">
                    <Separator className="mb-6" />

                    <div className="mb-10 mt-2 flex flex-col items-center justify-between pt-4 md:flex-row">
                        {/* Newsletter and Search Bar */}
                        <div className="w-full md:w-1/2">
                            <h3 className="text-lg font-medium">{t("Subscribe to our newsletter")}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {t("The latest news, articles, and resources, sent to your inbox weekly.")}
                            </p>
                            <form className="mt-2 flex items-center">
                                <Input
                                    className="mr-2 flex-grow"
                                    placeholder={t("Enter your email")}
                                    required
                                    type="email"
                                />
                                <Button type="submit">{t("Subscribe")}</Button>
                            </form>
                        </div>

                        {/* Social Links */}
                        <div className="mt-4 text-center md:mt-0 md:w-1/2 md:text-right">
                            <div className="space-x-2">
                                {footerNavigationItems.social.map((item) => (
                                    <a
                                        className="inline-block rounded-full p-2 text-primary hover:text-primary/80"
                                        href={item.href}
                                        key={item.name}
                                    >
                                        <item.icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Content */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                        {/* Footer Logo */}
                        <div className="flex gap-2 sm:col-span-3">
                            <FaReact className="mb-2 h-6 w-6" color="teal" />
                            <h2 className="mb-1 text-xl font-semibold">{t("MANDYTEC LLC")}</h2>
                        </div>

                        {/* Navigation Links */}
                        <div className="grid grid-cols-2 gap-4 sm:col-span-9 md:grid-cols-4">
                            {/* Solutions */}
                            <div className="pl-7">
                                <h3 className="mb-2 text-sm font-semibold">{t("Solutions")}</h3>
                                <ul className="space-y-2">
                                    {footerNavigationItems.solutions.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                className="text-sm text-muted-foreground hover:text-foreground"
                                                href={item.href}
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Support */}
                            <div className="pl-7">
                                <h3 className="mb-2 text-sm font-semibold">{t("Support")}</h3>
                                <ul className="space-y-2">
                                    {footerNavigationItems.support.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                className="text-sm text-muted-foreground hover:text-foreground"
                                                href={item.href}
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Company */}
                            <div className="pl-7">
                                <h3 className="mb-2 text-sm font-semibold">{t("Company")}</h3>
                                <ul className="space-y-2">
                                    {footerNavigationItems.company.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                className="text-sm text-muted-foreground hover:text-foreground"
                                                href={item.href}
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Legal */}
                            <div className="pl-7">
                                <h3 className="mb-2 text-sm font-semibold">{t("Legal")}</h3>
                                <ul className="space-y-2">
                                    {footerNavigationItems.legal.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                className="text-sm text-muted-foreground hover:text-foreground"
                                                href={item.href}
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        &copy; {t("2023 MANDYTEC LLC, Inc. All rights reserved.")}
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
