"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { motion } from "framer-motion"
import { ArrowLeft, FileQuestion, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <motion.div animate="show" className="space-y-6 text-center" initial="hidden" variants={container}>
                <motion.div
                    animate={{ opacity: 1, rotate: 0 }}
                    initial={{ opacity: 0, rotate: -180 }}
                    transition={{ stiffness: 100, type: "spring" }}
                >
                    <FileQuestion className="mx-auto h-16 w-16 text-muted-foreground" />
                </motion.div>
                <motion.div className="space-y-2" variants={item}>
                    <h1 className="text-4xl font-bold">404</h1>
                    <h2 className="text-2xl font-semibold">Page Not Found</h2>
                    <p className="mx-auto max-w-md text-muted-foreground">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </motion.div>
                <motion.div className="space-y-4" variants={item}>
                    <div className="flex items-center justify-center gap-4">
                        <Button className="flex items-center gap-2" onClick={() => router.back()} variant="outline">
                            <ArrowLeft className="h-4 w-4" />
                            Go Back
                        </Button>
                        <Link href="/">
                            <Button className="flex items-center gap-2" variant="default">
                                <Home className="h-4 w-4" />
                                Home
                            </Button>
                        </Link>
                    </div>
                </motion.div>
                <motion.div className="text-sm text-muted-foreground" variants={item}>
                    <p>Error Code: 404</p>
                </motion.div>
            </motion.div>
        </div>
    )
}
