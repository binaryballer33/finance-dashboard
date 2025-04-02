import type { LoggerInstance, PagesOptions } from "@auth/core/types"
import type { NextAuthConfig } from "next-auth"

import adapter from "@/auth/auth-config/adapter"
import callbacks from "@/auth/auth-config/callbacks"
import events from "@/auth/auth-config/events"
import providers from "@/auth/auth-config/providers"

import { NODE_ENV } from "@/lib/secrets"

import routes from "@/routes/routes"

const session: NextAuthConfig["session"] = { maxAge: 30 * 24 * 60 * 60, strategy: "jwt" }

const debug: NextAuthConfig["debug"] = NODE_ENV === "development"

const pages: Partial<PagesOptions> = {
    error: routes.error,
    signIn: routes.auth.login,
    signOut: routes.auth.signOut,
}

const logger: Partial<LoggerInstance> = {
    // can also get metadata from the debug callback
    debug(code) {
        console.debug("Next Auth Logger: Logging Console Debug", { code })
    },
    error(error: Error) {
        console.error("Next Auth Logger: Logging Console Error", { error })
    },
    warn(code) {
        console.warn("Next Auth Logger: Logging Console Warning", { code })
    },
}

const authConfig: NextAuthConfig = {
    adapter, // next auth uses this to perform crud operations on the user and account tables
    callbacks, // allow you to modify the sign-in process, json web token and session object
    debug,
    events, // auth events like sign-in, sign out, create/update user, link account, etc
    logger, // get information from next auth authentication flow
    pages, // customize the pages that are used for the sign in and sign out
    providers, // define the providers that you want to use with next auth, for example google, facebook, email and pw
    session, // modify the session's maxAge, strategy, etc
}

export default authConfig
