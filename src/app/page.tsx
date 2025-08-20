"use client"

import { useSession } from "next-auth/react"
import { LoginButton } from "@/components/LoginButton"
import Image from "next/image"

export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="p-6 border rounded-lg shadow-md">
        {session ? (
          <div className="space-y-4 text-center">
            <Image
              src={session.user?.image ?? ""}
              alt="profile"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h2 className="text-xl font-bold">Welcome, {session.user?.name}</h2>
            <p>{session.user?.email}</p>
            <LoginButton /> {/* logout button will show here */}
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold">AI Assistant</h2>
            <LoginButton /> {/* login button will show here */}
          </div>
        )}
      </div>
    </main>
  )
}
