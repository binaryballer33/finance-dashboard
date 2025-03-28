import { useCallback, useState } from "react"

type DialogController<T> = {
    data?: T
    handleClose: () => void
    handleOpen: (data?: T) => void
    open: boolean
}

export default function useDialog<T = unknown>(): DialogController<T> {
    const [state, setState] = useState<{ data?: T; open: boolean }>({
        data: undefined,
        open: false,
    })

    const handleOpen = useCallback((data?: T): void => {
        setState((prevState) => ({
            ...prevState,
            data,
            open: true,
        }))
    }, [])

    const handleClose = useCallback((): void => {
        setState((prevState) => ({
            ...prevState,
            open: false,
        }))
    }, [])

    return {
        data: state.data,
        handleClose,
        handleOpen,
        open: state.open,
    }
}
