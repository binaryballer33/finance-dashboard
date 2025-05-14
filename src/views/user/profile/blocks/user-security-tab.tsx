import type { UserSecuritySettings } from "@/types/forms/user-security-settings"
import type { ExtendedUser } from "@/types/types.d/next-auth-types"

import { defaultValues, UserSecuritySettingsSchema } from "@/types/forms/user-security-settings"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import handleServerResponse from "@/lib/helper-functions/handleServerResponse"

import updateUserSecuritySettings from "@/actions/user/update-user-security-settings"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import Field from "@/components/forms/fields"
import Form from "@/components/forms/form-provider"
import FormSubmitButton from "@/components/forms/form/form-submit-button"

type SecurityTabProps = {
    user: ExtendedUser
}

export default function SecurityTab({ user }: SecurityTabProps) {
    const form = useForm<UserSecuritySettings>({
        defaultValues,
        resolver: zodResolver(UserSecuritySettingsSchema),
    })

    const onSubmit = form.handleSubmit(async (formData) => {
        const response = await updateUserSecuritySettings(user?.id, formData)
        await handleServerResponse({ response, toast })
    })

    return (
        <Form form={form} onSubmit={onSubmit}>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Security Page</CardTitle>
                        <CardDescription>Edit Your Security Settings.</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <Field.Switch
                            helperText="Secure Your Account With Two-Factor Authentication."
                            label="Two-Factor Authentication"
                            name="isTwoFactorEnabled"
                        />
                    </CardContent>

                    <CardFooter>
                        <FormSubmitButton loadingTitle="Updating Security Settings" title="Update Security Settings" />
                    </CardFooter>
                </Card>
            </div>
        </Form>
    )
}
