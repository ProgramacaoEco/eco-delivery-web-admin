import Google from "next-auth/providers/google";
import NextAuth from "next-auth";

const provider = Google({});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [provider],
  pages: {
    signIn: "/signin",
  },
});

export const providerData = { id: provider.id, name: provider.name };
