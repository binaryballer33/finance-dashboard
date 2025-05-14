import type { UserSettings } from "@/types/forms/update-user-account-settings"
import type { ExtendedUser } from "@/types/types.d/next-auth-types"

import { defaultValues, UserSettingsSchema } from "@/types/forms/update-user-account-settings"

import { useState } from "react"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { placeholderImage } from "@/lib/constants"
import handleServerResponse from "@/lib/helper-functions/handleServerResponse"

import updateUserAccountSettings from "@/actions/user/update-user-account-settings"

import routes from "@/routes/routes"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import Form from "@/components/forms/form-provider"
import FormSubmitButton from "@/components/forms/form/form-submit-button"
import CustomFormInput from "@/components/forms/rhf-custom-input"

type UserInformationProps = {
    user: ExtendedUser
}

export default function UserInformation({ user }: UserInformationProps) {
    const [avatar, setAvatar] = useState<null | string>(user?.imageUrl || null)

    const form = useForm<UserSettings>({
        defaultValues,
        resolver: zodResolver(UserSettingsSchema),
    })

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
            <Card>
                <CardHeader>
                    <CardTitle>User Information</CardTitle>
                    <CardDescription>Update your account information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage alt="Profile picture" src={avatar || placeholderImage} />
                            <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <Input
                            accept="image/*"
                            aria-label="Upload Profile Picture"
                            id="avatar"
                            onChange={handleAvatarChange}
                            type="file"
                        />
                    </div>

                    <CustomFormInput<UserSettings> label="First Name" name="firstName" type="text" />

                    <CustomFormInput<UserSettings> label="Last Name" name="lastName" type="text" />

                    <FormSubmitButton loadingTitle="Updating Account Settings" title="Update Account Settings" />
                </CardContent>
            </Card>
        </Form>
    )
}
