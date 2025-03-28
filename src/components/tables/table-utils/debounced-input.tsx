import type { InputHTMLAttributes } from "react"

import { forwardRef, useEffect, useState } from "react"

import { Input } from "@/components/ui/input"

// Define a type for the DebouncedInput props
type DebouncedInputProps = {
    debounce?: number
    onChange: (value: string) => void
    value: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">

// TODO: not deboucing now because I removed the constant state update whenever the filter state input field changes
// TODO: debounce value is 0, will need to change it to 500 when I add the constant state update and the feature is stable
const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>((props, ref) => {
    const { debounce = 0, onChange, value: initialValue, ...restOfProps } = props
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value, debounce, onChange])

    return <Input {...restOfProps} onChange={(e) => setValue(e.target.value)} ref={ref} value={value} />
})

export default DebouncedInput
