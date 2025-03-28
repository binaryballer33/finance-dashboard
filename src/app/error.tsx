"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useEffect } from "react"

import { motion } from "framer-motion"
import { AlertCircle, ArrowLeft, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Error({ error, reset }: { error: { digest?: string } & Error; reset: () => void }) {
    const router = useRouter()

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    animate={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    transition={{ delay: 0.2, stiffness: 200, type: "spring" }}
                >
                    <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
                </motion.div>
                <motion.div
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold">Something went wrong!</h2>
                    <p className="mx-auto max-w-md text-muted-foreground">
                        An unexpected error occurred. Please try again or contact support if the problem persists.
                    </p>
                </motion.div>
                <motion.div
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Button className="mx-2" onClick={reset} variant="default">
                        Try again
                    </Button>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <Button className="flex items-center gap-2" onClick={() => router.back()} variant="outline">
                            <ArrowLeft className="h-4 w-4" />
                            Go Back
                        </Button>
                        <Link href="/">
                            <Button className="flex items-center gap-2" variant="outline">
                                <Home className="h-4 w-4" />
                                Home
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
