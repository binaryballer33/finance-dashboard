import { useSession } from "next-auth/react"

export default function useAuthUser() {
    const session = useSession()

    const user = session?.data?.user ?? null
    return user
}
