import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          await connectDB()

          const existingUser = await User.findOne({ email: user.email })

          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
            })
          }

          return true
        } catch (error) {
          console.error("Error saving user:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        try {
          await connectDB()
          const dbUser = await User.findOne({ email: user.email })
          if (dbUser) {
            token.id = dbUser._id.toString()
          }
        } catch (error) {
          console.error("Error fetching user:", error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
