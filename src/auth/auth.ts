import NextAuth from "next-auth"

import authConfig from "@/auth/auth-config/auth-config"

/*
 * TODO: My Next Auth TODOS
 *  - figure out how to make auth state change on sign in reflect across app without refresh
 */
export const { auth, handlers, signIn, signOut } = NextAuth({ ...authConfig })
