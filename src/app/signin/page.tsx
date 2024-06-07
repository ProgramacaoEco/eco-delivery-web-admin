"use client";

import { continueWithGoogle, signin } from "./style.css";

import GoogleButton from "@/components/basis/Button/GoogleButton";
import { providerData } from "@/auth";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className={signin}>
      <div className={continueWithGoogle}>
        <GoogleButton
          label="Prosseguir para o Google"
          action={async () =>
            await signIn(providerData.id, {
              redirect: true,
              callbackUrl: "/home",
            })
          }
        />
      </div>
    </div>
  );
}
