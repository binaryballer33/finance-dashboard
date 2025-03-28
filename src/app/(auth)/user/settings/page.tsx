import { appMetadata } from "@/lib/config"

import UserAccountSettingsView from "@/views/user/settings/user-account-settings"

export const metadata = appMetadata.userSettings

export default async function UserSettingsPage() {
    return <UserAccountSettingsView />
}
