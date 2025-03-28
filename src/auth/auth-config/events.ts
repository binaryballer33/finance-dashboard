import type { NextAuthConfig } from "next-auth"

import updateUserEmailVerification from "@/actions/user/update-user-email-verification"

const events: NextAuthConfig["events"] = {
    async linkAccount({ user }) {
        await updateUserEmailVerification(user.id!)
    },

    /* These are the events that are fired when a user is signed in/out */
    // async linkAccount(params) {
    //     console.log("Link Account Event", { params })
    // },
    //
    // async signIn(params) {
    //     console.log("Sign In Event", { params })
    // },
    //
    // async signOut(params) {
    //     console.log("Sign Out Event", { params })
    // },
    //
    // async session(params) {
    //     console.log("Session Event", { params })
    // },
    //
    // createUser(params) {
    //     console.log("Create User Event", { params })
    // },
    //
    // updateUser(params) {
    //     console.log("Update User Event", { params })
    // },
}

export default events
