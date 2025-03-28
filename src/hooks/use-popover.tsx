import type { MutableRefObject } from "react"

import { useCallback, useRef, useState } from "react"

type PopoverController<T> = {
    anchorRef: MutableRefObject<null | T>
    handleClose: () => void
    handleOpen: () => void
    handleToggle: () => void
    open: boolean
}

export default function usePopover<T = HTMLElement>(): PopoverController<T> {
    const anchorRef = useRef<null | T>(null)
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = useCallback((): void => {
        setOpen(true)
    }, [])

    const handleClose = useCallback((): void => {
        setOpen(false)
    }, [])

    const handleToggle = useCallback((): void => {
        setOpen((prevState) => !prevState)
    }, [])

    return {
        anchorRef,
        handleClose,
        handleOpen,
        handleToggle,
        open,
    }
}
