"use client"

import type { Dispatch, SetStateAction } from "react"

import { useCallback, useMemo, useState } from "react"

export type UseBooleanReturn = {
    handleFalse: () => void
    handleToggle: () => void
    handleTrue: () => void
    setValue: Dispatch<SetStateAction<boolean>>
    value: boolean
}

export function useBoolean(defaultValue: boolean = false): UseBooleanReturn {
    const [value, setValue] = useState(defaultValue)

    const handleTrue = useCallback(() => {
        setValue(true)
    }, [])

    const handleFalse = useCallback(() => {
        setValue(false)
    }, [])

    const handleToggle = useCallback(() => {
        setValue((prev) => !prev)
    }, [])

    return useMemo(
        () => ({
            handleFalse,
            handleToggle,
            handleTrue,
            setValue,
            value,
        }),
        [value, handleTrue, handleFalse, handleToggle, setValue],
    )
}
