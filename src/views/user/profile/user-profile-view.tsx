"use client"

import { Settings } from "lucide-react"

import useAuthUser from "@/hooks/use-auth-user"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Container from "@/components/base/container"
import FlexCenteredFullScreenContainer from "@/components/base/flex-box/flex-center-full-screen-container"
import { H1 } from "@/components/base/typography"
import FormHead from "@/components/forms/form/form-head"

import BudgetTab from "./blocks/user-budget-tab"
import UserInformation from "./blocks/user-information"
import SecurityTab from "./blocks/user-security-tab"

export default function UserProfileView() {
    const user = useAuthUser()
    if (!user) return null

    return (
        <div className="w-full">
            <H1 className="my-4 text-center">Welcome Back {user.firstName}</H1>

            <FlexCenteredFullScreenContainer minHeight="85dvh">
                <FormHead
                    description="Update Your Account Settings"
                    icon={<Settings className="h-20 w-20 text-primary" />}
                    title="Account Settings"
                />

                <Container className="space-y-4" maxWidth="md">
                    <Tabs defaultValue="user-information">
                        <TabsList>
                            <TabsTrigger value="user-information">User Information</TabsTrigger>
                            <TabsTrigger value="security">Security</TabsTrigger>
                            <TabsTrigger value="budget">Budget</TabsTrigger>
                        </TabsList>

                        <TabsContent value="user-information">
                            <UserInformation user={user} />
                        </TabsContent>

                        <TabsContent value="security">
                            <SecurityTab user={user} />
                        </TabsContent>

                        <TabsContent value="budget">
                            <BudgetTab user={user} />
                        </TabsContent>
                    </Tabs>
                </Container>
            </FlexCenteredFullScreenContainer>
        </div>
    )
}
