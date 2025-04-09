"use client"

import type { RegisterRequest } from "@/types/forms/register"
import type { Transaction } from "@/types/forms/transaction"
import type { Trade } from "@prisma/client"

import { type ReactNode } from "react"

import { useFormContext } from "react-hook-form"

import { Edit, Key, Mail, X } from "lucide-react"

import { cn } from "@/lib/utils"

import { useBoolean } from "@/hooks/use-boolean"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import FlexBetweenContainer from "../base/flex-box/flex-between-container"
import FormFieldVisibilityIcon from "./form/form-field-visibility-icon"

type InputName = "name" | keyof RegisterRequest | keyof Trade | keyof Transaction

type CustomInputProps = {
    className?: string
    icon?: ReactNode
    inputName: InputName
    label: string
    showVisibilityToggle?: boolean
}

// TODO: make the user specific input types as a prop
export default function CustomInput(props: CustomInputProps) {
    const { className, inputName, label, showVisibilityToggle = false } = props

    const placeholder = getPlaceholder(inputName, label)

    /* access the state of the parent form using react hook form */
    const { control, setValue } = useFormContext()

    /* used to toggle the password visibility */
    const { handleToggle: isFieldVisibleToggle, value: isFieldVisible } = useBoolean()

    /* gets the initial input type and changes the input type of the password when icon button is toggled  */
    const inputType = getInputType(inputName, label, showVisibilityToggle, isFieldVisible)

    /*  gets the icon for the input */
    const icon = getStartAdornment(inputName)

    return (
        <FormField
            control={control}
            name={inputName}
            render={({ field, fieldState }) => (
                <FormItem className="group flex-grow">
                    <FlexBetweenContainer>
                        <FormLabel className="flex h-8 items-center justify-center font-medium group-focus-within:text-primary">
                            {label}
                        </FormLabel>

                        {/* visibility toggle icon */}
                        {showVisibilityToggle ? (
                            <FormFieldVisibilityIcon
                                inputName={inputName}
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
                                className={cn("pl-10", className)}
                                placeholder={placeholder}
                                type={inputType}
                            />

                            {/* Icon on the far right of the input field, used to clear the text in the field */}
                            {field.value !== undefined && field.value !== "" && (
                                <button
                                    className="absolute inset-y-0 right-3 flex items-center"
                                    onClick={() => setValue(inputName, inputType === "number" ? 0 : "")}
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

/* gives you a basic good placeholder for your input */
function getPlaceholder(inputName: InputName, label: string) {
    if (label === "Confirm New Password") return "Write Your New Password Again"
    if (label === "Confirm Password" || inputName === "confirmPassword") return "Write Your Password Again"
    return `Write Your ${label}`
}

/*
 * sets the input type based on whether the visibility icons are shown or not
 * whether the field is currently visible
 * and whether the label and name is email or not
 */
function getInputType(name: string, label: string, showButtons: boolean | undefined, isFieldVisible: boolean) {
    let inputType: string

    if (name.toLowerCase() === "email" || label.toLowerCase() === "email") {
        inputType = "email"
    } else if (showButtons && !isFieldVisible) {
        inputType = "password"
    } else if (name.toLowerCase() === "date" || label.toLowerCase() === "date") {
        inputType = "date"
    } else if (
        name.toLowerCase() === "amount" ||
        label.toLowerCase() === "amount" ||
        name.toLowerCase() === "buytoclose" ||
        label.toLowerCase() === "buytoclose" ||
        name.toLowerCase() === "selltoopen" ||
        label.toLowerCase() === "selltoopen" ||
        name.toLowerCase() === "strike" ||
        label.toLowerCase() === "strike" ||
        name.toLowerCase() === "profitloss" ||
        label.toLowerCase() === "profitloss" ||
        name.toLowerCase() === "profitlosspercentage" ||
        label.toLowerCase() === "profitlosspercentage"
    ) {
        inputType = "number"
    } else {
        inputType = "text"
    }
    return inputType
}

/*  gets the correct icon for each input type  */
function getStartAdornment(inputName: InputName) {
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
