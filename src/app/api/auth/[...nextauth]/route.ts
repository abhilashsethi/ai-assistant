import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { users } from "@/lib/db/schema"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      // check if user exists
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))

      if (existing.length === 0) {
        // insert new user
        await db.insert(users).values({
          name: user.name ?? "Anonymous",
          email: user.email,
          image: user.image ?? null,
        })
      }

      return true
    },
  },
})

export { handler as GET, handler as POST }



