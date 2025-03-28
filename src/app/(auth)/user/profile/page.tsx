import { appMetadata } from "@/lib/config"

import UserProfileView from "@/views/user/profile/user-profile-view"

export const metadata = appMetadata.userProfile

export default async function UserProfile() {
    return <UserProfileView />
}
