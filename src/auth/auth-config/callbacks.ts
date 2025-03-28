import type { NextAuthConfig } from "next-auth"

import getUserById from "@/actions/user/get-user-by-id" /*
 * the user object that is returned from the Credentials authorize callback is passed to the sign-in callback
 *
 * the user object that is returned from the OAuth Provider is passed to the sign-in callback, shape of user object depends on the oauth provider
 * after sign in returns true, user will be created in the db automatically by next auth using prisma adapter if using oauth provider
 *
 * the sign-in callback is called right after the Credential provider's authorize callback or the Oauth provider's authorization result
 * the sign-in callback is passed the user object from the authorize callback
 * the sign-in callback is the last chance you have to modify in the user object
 * before next auth uses the database adapter to perform crud operations on the user and creates the user in the db
 *
 * jwt callback is called after the sign-in callback and happens after the user has been logged in and returns the token
 *
 * session callback happens after the jwt callback and uses the token returned from the jwt callback, returns the session
 */

/*
 * the user object that is returned from the Credentials authorize callback is passed to the sign-in callback
 *
 * the user object that is returned from the OAuth Provider is passed to the sign-in callback, shape of user object depends on the oauth provider
 * after sign in returns true, user will be created in the db automatically by next auth using prisma adapter if using oauth provider
 *
 * the sign-in callback is called right after the Credential provider's authorize callback or the Oauth provider's authorization result
 * the sign-in callback is passed the user object from the authorize callback
 * the sign-in callback is the last chance you have to modify in the user object
 * before next auth uses the database adapter to perform crud operations on the user and creates the user in the db
 *
 * jwt callback is called after the sign-in callback and happens after the user has been logged in and returns the token
 *
 * session callback happens after the jwt callback and uses the token returned from the jwt callback, returns the session
 */

/*
 * the user object that is returned from the Credentials authorize callback is passed to the sign-in callback
 *
 * the user object that is returned from the OAuth Provider is passed to the sign-in callback, shape of user object depends on the oauth provider
 * after sign in returns true, user will be created in the db automatically by next auth using prisma adapter if using oauth provider
 *
 * the sign-in callback is called right after the Credential provider's authorize callback or the Oauth provider's authorization result
 * the sign-in callback is passed the user object from the authorize callback
 * the sign-in callback is the last chance you have to modify in the user object
 * before next auth uses the database adapter to perform crud operations on the user and creates the user in the db
 *
 * jwt callback is called after the sign-in callback and happens after the user has been logged in and returns the token
 *
 * session callback happens after the jwt callback and uses the token returned from the jwt callback, returns the session
 */
const callbacks: NextAuthConfig["callbacks"] = {
    async jwt({ token }) {
        if (!token.sub) return token

        const existingUserResponse = await getUserById(token.sub)
        if (!("user" in existingUserResponse)) return token

        token.role = existingUserResponse.user.role
        token.firstName = existingUserResponse.user.firstName
        token.lastName = existingUserResponse.user.lastName
        token.isTwoFactorEnabled = existingUserResponse.user.isTwoFactorEnabled
        token.imageUrl = existingUserResponse.user.imageUrl!

        return token
    },

    async session({ session, token }) {
        if (token.sub && session.user) session.user.id = token.sub
        if (token.role && session.user) session.user.role = token.role
        if (token.firstName && session.user) session.user.firstName = token.firstName
        if (token.lastName && session.user) session.user.lastName = token.lastName
        if (token.isTwoFactorEnabled !== undefined && session.user)
            session.user.isTwoFactorEnabled = token.isTwoFactorEnabled

        if (token.imageUrl && session.user) session.user.imageUrl = token.imageUrl

        return session
    },

    // TODO: figure out how to make the id from google the same id prisma uses to create the user
    async signIn({ account, profile, user }) {
        if (!user || !user.email || !user.id) return false

        if (account?.provider === "google" || account?.provider === "facebook") {
            user.firstName = profile?.given_name!
            user.lastName = profile?.family_name!
            user.imageUrl = user.image!
        }

        if (account?.provider === "google" || account?.provider === "facebook") return true

        // if you are signing in with credentials that were already authorized in authorize callback then return true
        return account?.provider === "credentials"
    },
}

export default callbacks
