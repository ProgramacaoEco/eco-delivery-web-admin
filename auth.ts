import { Collections } from "@/helpers/firestore/collections";
import { FirestoreHelper } from "@/helpers/firestore";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";

const provider = Google({});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [provider],
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  callbacks: {
    async signIn({ account, profile }) {
      const user = await FirestoreHelper.getBy(
        profile?.email ?? "",
        Collections.Usuarios
      );
      const userExists = !!user;
      return userExists;
    },
  },
});

export const providerData = { id: provider.id, name: provider.name };
