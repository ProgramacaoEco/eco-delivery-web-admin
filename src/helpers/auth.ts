import { app } from "@/firebase-config";
import { FirebaseError } from "firebase/app";
import {
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

console.log(process.env.API_KEY);

const auth = getAuth(app);
auth.languageCode = "pt";

export async function signIn() {
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    login_hint: "usuario@email.com",
  });

  try {
    const signInResult = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(signInResult);
    const token = credential?.accessToken;
    const user = signInResult.user;

    return { token, user };
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error(error.code, error.message, error.customData?.email);
    } else {
      console.error(error);
    }
  }
}

export async function logOff() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}

export async function onAuthChanged(
  onSignIn: (user: User | null) => void,
  onSignOut: () => void
) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      onSignIn(user);
    } else {
      onSignOut();
    }
  });
}
