"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")} size="icon" variant="ghost">
                        <Sun className="h-5 w-5 rotate-0 scale-100 text-primary transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 text-primary transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{theme === "light" ? "Dark Mode" : "Light Mode"}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
