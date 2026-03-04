import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";

const allowedDomains = (process.env.ALLOWED_EMAIL_DOMAINS ?? "")
  .split("|")
  .filter(Boolean);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      if (allowedDomains.length === 0) return true;
      const domain = user.email.split("@")[1];
      return allowedDomains.includes(domain);
    },
    async session({ session, user }) {
      if (session.user) {
        (session.user as Record<string, unknown>).id = user.id;
        (session.user as Record<string, unknown>).role =
          (user as unknown as Record<string, unknown>).role ?? "MEMBER";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
