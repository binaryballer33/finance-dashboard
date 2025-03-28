import { useRouter } from "next/navigation"

import { useEffect } from "react"

/*
 * Redirect to a certain page if the user is still on the page that called this hook after 4 seconds
 * Redirect route and timeout can be changed when using the hook
 * By default the timeout is 4 seconds and the redirect route is "/"
 */
export default function useRedirectIfStale(redirectTo = "/", timeout = 4000) {
    const router = useRouter()
    const currentPath = typeof window !== "undefined" ? window.location.pathname : ""

    // Set a timer to redirect after a certain time if still on the same page
    useEffect(() => {
        const timer = setTimeout(() => {
            if (window.location.pathname === currentPath) {
                router.push(redirectTo)
            }
        }, timeout)

        // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(timer)
    }, [currentPath, router, timeout, redirectTo])
}
