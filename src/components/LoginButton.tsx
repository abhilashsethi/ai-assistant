"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span>Hello, {session.user?.name}</span>
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
    )
  }
  return <Button onClick={() => signIn("google")}>Login with Google</Button>
}
