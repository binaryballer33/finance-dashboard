import type { IconType } from "react-icons"

import { FaFacebookSquare } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

export type OAuthProvider = {
    icon: IconType
    id: "facebook" | "google"
    name: string
}

const oAuthProviders = {
    facebook: {
        icon: FaFacebookSquare,
        id: "facebook",
        name: "Facebook",
    } satisfies OAuthProvider,
    google: {
        icon: FcGoogle,
        id: "google",
        name: "Google",
    } satisfies OAuthProvider,
}

export default oAuthProviders
