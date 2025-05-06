// AuthGuard.tsx
"use client";

import { PropsWithChildren, useEffect } from "react";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";
import { app, auth } from "@/firebase-config";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""
      ),
    });

    let isMounted = true;

    console.log("AuthGuard Effect triggered. Pathname:", pathname);

    // With signInWithPopup, we primarily rely on onAuthStateChanged
    // to detect the user's state after the popup closes or on initial load.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(
        "AuthGuard: onAuthStateChanged triggered.",
        user?.uid || null
      );
      if (!isMounted) return;

      if (user) {
        // User is signed in
        console.log("AuthGuard: User is signed in.");
        // If user is logged in and tries to access the login page, redirect them away
        if (pathname === "/") {
          console.log("AuthGuard: User on login page, redirecting to /home");
          router.push("/home");
        }
      } else {
        // User is signed out
        console.log("AuthGuard: User is signed out.");
        // If user is not logged in and not on the login page, redirect to login
        if (pathname !== "/") {
          console.log("AuthGuard: User not on login page, redirecting to /");
          router.push("/");
        }
      }
    });

    // Cleanup function
    return () => {
      console.log("AuthGuard unmounting or dependencies changed.");
      isMounted = false;
      unsubscribe();
    };
  }, [router, pathname]); // Dependencies remain the same

  // If not loading, render the children (protected content)
  // The redirection logic inside useEffect handles unauthorized access.

  return <>{children}</>;
}
