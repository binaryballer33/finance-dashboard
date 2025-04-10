"use client"

import { type ReactNode } from "react"

import { useFormContext } from "react-hook-form"

import { Edit, Key, Mail, X } from "lucide-react"

import { cn } from "@/lib/utils"

import { useBoolean } from "@/hooks/use-boolean"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import FlexBetweenContainer from "../base/flex-box/flex-between-container"
import FormFieldVisibilityIcon from "./form/form-field-visibility-icon"

type CustomInputProps<T extends Record<string, any>> = {
    /* custom class styles for the input field */
    className?: string

    /* custom icon for the input field */
    icon?: ReactNode

    /* label for the input field */
    label: string

    /* name of the input field, has to be a key of the form data */
    name: keyof T & string

    /* placeholder for the input field */
    placeholder?: string

    /* show the visibility toggle icon */
    showVisibilityToggle?: boolean

    /* type of the input field */
    type: "date" | "email" | "number" | "password" | "text"
}

export default function CustomInput<T extends Record<string, any>>(props: CustomInputProps<T>) {
    const {
        className,
        icon: userGivenIcon,
        label,
        name,
        placeholder = `Write Your ${label}`,
        showVisibilityToggle = false,
        type = "text",
    } = props

    /* access the state of the parent form using react hook form */
    const { control, setValue } = useFormContext()

    /* used to toggle the password visibility */
    const { handleToggle: isFieldVisibleToggle, value: isFieldVisible } = useBoolean()

    /* determine final input type based on visibility toggle */
    const finalInputType = handleInputTypeChange(type, showVisibilityToggle, isFieldVisible)

    /*  gets the icon for the input */
    const icon = userGivenIcon ?? getStartAdornment(name)

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className="group flex-grow">
                    <FlexBetweenContainer>
                        <FormLabel
                            className="flex h-8 items-center justify-center font-medium group-focus-within:text-primary"
                            htmlFor={`input-${name}`}
                        >
                            {label}
                        </FormLabel>

                        {/* visibility toggle icon */}
                        {showVisibilityToggle ? (
                            <FormFieldVisibilityIcon
                                inputName={name}
                                isFieldVisible={isFieldVisible}
                                isFieldVisibleToggle={isFieldVisibleToggle}
                            />
                        ) : null}
                    </FlexBetweenContainer>

                    <FormControl>
                        <div className="relative">
                            {/* input icon */}
                            {icon ? (
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    {icon}
                                </div>
                            ) : null}

                            {/* input field */}
                            <Input
                                {...field}
                                autoComplete="on"
                                className={cn("pl-10", className)}
                                id={`input-${name}`}
                                placeholder={placeholder}
                                type={finalInputType}
                            />

                            {/* Icon on the far right of the input field, used to clear the text in the field */}
                            {field.value !== undefined && field.value !== "" && (
                                <button
                                    className="absolute inset-y-0 right-3 flex items-center"
                                    onClick={() => {
                                        // Safe type casting as we're clearing field value
                                        setValue(name, finalInputType === "number" ? 0 : ("" as any))
                                    }}
                                    type="button"
                                >
                                    <X className="h-5 w-5 text-gray-400" />
                                </button>
                            )}
                        </div>
                    </FormControl>
                    {fieldState.error?.message && <FormMessage />}
                </FormItem>
            )}
        />
    )
}

/*  gets the default icon for each input type if no custom icon is provided  */
function getStartAdornment(inputName: string) {
    const iconProps = { className: "h-4 w-4" }

    switch (inputName) {
        case "email":
            return <Mail {...iconProps} />
        case "password":
        case "confirmPassword":
            return <Key {...iconProps} />
        default:
            return <Edit {...iconProps} />
    }
}

/* toggle the password input type when the visibility toggle icon is clicked */
function handleInputTypeChange(inputType: string, showVisibilityToggle: boolean, isFieldVisible: boolean) {
    if (inputType === "password" && showVisibilityToggle && !isFieldVisible) return "password"
    if (inputType === "password" && showVisibilityToggle && isFieldVisible) return "text"
    return inputType
}
