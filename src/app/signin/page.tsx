"use client";

import GoogleButton from "@/components/basis/Button/GoogleButton";
import { providerData } from "@/auth";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <GoogleButton
      action={async () =>
        await signIn(providerData.id, { redirect: true, callbackUrl: "/home" })
      }
    />
  );
}
