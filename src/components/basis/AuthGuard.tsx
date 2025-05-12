"use client";

import { app, auth } from "@/firebase-config";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";
import { getDatabase, onValue, ref } from "firebase/database";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import { User as UserModel } from "@/helpers/firestore/model/admin/user";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import toast from "react-hot-toast";
import { useAppCheck } from "./AppCheckProvider";
import { loadingContainer } from "./LoadingContainer/style.css";
import { Typography } from "./Typography";

export default function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const { getBy } = useFirebase();

  const [isOnline, setIsOnline] = useState(true);

  const { setAppCheck, appCheck: providerAppCheck } = useAppCheck();

  const checkNetworkStatus = async () => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    if (!auth.currentUser) return handleOnline();

    try {
      const db = getDatabase();
      const connectedRef = ref(db, ".info/connected");
      onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
          handleOnline();
        } else {
          console.log("here");
          handleOffline();
        }
      });
    } catch {
      handleOffline();
    }
  };

  useEffect(() => {
    auth.beforeAuthStateChanged(async (user) => {
      if (user === null) {
        toast.dismiss();
        return;
      }

      await getBy({
        id: user?.email ?? "",
        collection: Collections.Usuarios,
        onData: (data?: User) => {
          console.log("User exists: ", data);
          if (!data) {
            toast.dismiss();
            toast.error("Usuário não possui permissão para acessar o sistema.");
            throw new FirebaseError("user-not-found", "User does not exist");
          }
        },
        onError: () => {
          throw new FirebaseError("user-not-found", "User does not exist");
        },
        transformer: (data) =>
          new UserModel(data?.id, data?.email, data?.userName, data?.isAdmin),
      });
    });
  }, [getBy]);

  useEffect(() => {
    console.log("Provider app check: ", providerAppCheck);
  }, [providerAppCheck]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }

    const appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""
      ),
    });

    setAppCheck(appCheck);
  }, [setAppCheck]);

  useEffect(() => {
    let isMounted = true;

    console.log("AuthGuard Effect triggered. Pathname:", pathname);

    // With signInWithPopup, we primarily rely on onAuthStateChanged
    // to detect the user's state after the popup closes or on initial load.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      checkNetworkStatus();

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
  }, [router, pathname, setAppCheck]); // Dependencies remain the same
  // If not loading, render the children (protected content)
  // The redirection logic inside useEffect handles unauthorized access.

  return (
    <>
      {isOnline ? (
        children
      ) : (
        <div className={loadingContainer}>
          <Typography.TitleBold>
            Você está sem internet. Por favor, verifique sua conexão e tente
            novamente.
          </Typography.TitleBold>
        </div>
      )}
    </>
  );
}
