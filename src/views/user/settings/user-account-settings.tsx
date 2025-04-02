"use client"

import type { UserSettings } from "@/types/forms/update-user-account-settings"

import { UserSettingsSchema } from "@/types/forms/update-user-account-settings"

import { useState } from "react"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Settings } from "lucide-react"
import { toast } from "sonner"

import { placeholderImage } from "@/lib/constants"
import handleServerResponse from "@/lib/helper-functions/handleServerResponse"

import updateUserAccountSettings from "@/actions/user/update-user-account-settings"

import useAuthUser from "@/hooks/useAuthUser"

import routes from "@/routes/routes"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

import Container from "@/components/base/container"
import FlexCenteredFullScreenContainer from "@/components/base/flex-box/flex-center-full-screen-container"
import Field from "@/components/forms/fields"
import Form from "@/components/forms/form-provider"
import FormHead from "@/components/forms/form/form-head"
import FormSubmitButton from "@/components/forms/form/form-submit-button"
import CustomFormInput from "@/components/forms/rhf-custom-input"

export default function UserAccountSettingsView() {
    const user = useAuthUser()

    const defaultValues = {
        firstName: user?.firstName || "",
        isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
        lastName: user?.lastName || "",
    } satisfies UserSettings

    const [avatar, setAvatar] = useState<null | string>(user?.imageUrl || null)

    const form = useForm<UserSettings>({ defaultValues, resolver: zodResolver(UserSettingsSchema) })

    // if user object don't render this page
    if (!user) return null

    const onSubmit = form.handleSubmit(async (formData) => {
        const response = await updateUserAccountSettings(user?.id, formData)
        await handleServerResponse({ redirectTo: routes.user.profile, response, toast })
    })

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setAvatar(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    return (
        <Form form={form} onSubmit={onSubmit}>
            <FlexCenteredFullScreenContainer minHeight="85dvh">
                <FormHead
                    description="Update Your Account Settings"
                    icon={<Settings className="h-20 w-20 text-primary" />}
                    title="Account Settings"
                />

                <Container className="space-y-4" maxWidth="md">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage alt="Profile picture" src={avatar || placeholderImage} />
                            <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <Input accept="image/*" id="avatar" onChange={handleAvatarChange} type="file" />
                    </div>

                    <CustomFormInput inputName="firstName" label="First Name" />
                    <CustomFormInput inputName="lastName" label="Last Name" />
                    <Field.Switch
                        helperText="Secure your account with two-factor authentication."
                        label="Two-factor Authentication"
                        name="isTwoFactorEnabled"
                    />

                    <FormSubmitButton loadingTitle="Updating Account Settings" title="Update Account Settings" />
                </Container>
            </FlexCenteredFullScreenContainer>
        </Form>
    )
}
