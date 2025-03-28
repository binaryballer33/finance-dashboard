import { usePathname } from "next/navigation"

import { useCallback, useEffect, useState } from "react"

export default function useMobileNav() {
    const pathname = usePathname()
    const [open, setOpen] = useState<boolean>(false)

    const handlePathnameChange = useCallback((): void => {
        if (open) setOpen(false)
    }, [open])

    useEffect(() => {
        handlePathnameChange()

        // IMPORTANT: This effect should only run when the pathname changes, altering this will break mobile nav functionality
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    const handleOpen = useCallback((): void => {
        setOpen(true)
    }, [])

    const handleClose = useCallback((): void => {
        setOpen(false)
    }, [])

    return {
        handleClose,
        handleOpen,
        open,
    }
}
