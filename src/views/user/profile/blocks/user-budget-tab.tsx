import type { UserBudget } from "@/types/forms/user-budget"
import type { ExtendedUser } from "@/types/types.d/next-auth-types"

import { useForm } from "react-hook-form"

import { toast } from "sonner"

import handleServerResponse from "@/lib/helper-functions/handleServerResponse"

import updateUserBudget from "@/actions/user/update-user-budget"

import routes from "@/routes/routes"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import Form from "@/components/forms/form-provider"
import FormSubmitButton from "@/components/forms/form/form-submit-button"
import CustomInput from "@/components/forms/rhf-custom-input"

type BudgetTabProps = {
    user: ExtendedUser
}

export default function BudgetTab(props: BudgetTabProps) {
    const { user } = props

    const form = useForm<UserBudget>({ defaultValues: { budgetAmount: user.budgetAmount } })

    const onSubmit = form.handleSubmit(async (formData) => {
        const response = await updateUserBudget(user.id, formData)
        await handleServerResponse({ redirectTo: routes.user.profile, response, toast })
    })

    return (
        <Form form={form} onSubmit={onSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Budget</CardTitle>
                    <CardDescription>Manage your budget</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <CustomInput label="Budget Amount" name="budgetAmount" type="number" />

                    <FormSubmitButton loadingTitle="Updating Budget" title="Update Budget" />
                </CardContent>
            </Card>
        </Form>
    )
}
