import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      // 👇 Force Google to show the account picker every time
      authorization: {
        params: {
          prompt: "select_account", // or "consent select_account" if you also want the consent screen
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        await connectDB();
        const user = await User.findOne({ username: credentials.username }).lean();
        if (!user?.password) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        return {
          id: String(user._id),
          name: user.username ?? user.name ?? "",
          email: user.email ?? "",
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectDB();
        const email = user?.email?.toLowerCase();
        if (!email) return false;
        await User.updateOne(
          { email },
          {
            $setOnInsert: { username: email.split("@")[0], email },
            $set: {
              name: user.name ?? profile?.name ?? "",
              avatar: user.image ?? profile?.picture ?? "",
              provider: "google",
            },
          },
          { upsert: true }
        );
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },

    async session({ session, token }) {
      if (!session.user) session.user = {};
      if (token?.id) session.user.id = token.id;
      return session;
    },

    // ✅ Always land on /dashboard after login (Credentials or Google)
    async redirect({ url, baseUrl }) {
      // If a callbackUrl is explicitly provided and is internal, you can honor it:
      // if (url.startsWith(baseUrl)) return url;
      // But since you want to always go to /dashboard, just do:
      return `${baseUrl}/dashboard`;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
