import { useAppCheck } from "@/components/basis/AppCheckProvider";
import { auth } from "@/firebase-config";
import { getToken } from "firebase/app-check";
import { User } from "firebase/auth";

type CompressionErrorResponse = {
  error?: string;
  message?: string;
};

export function useCompressImage() {
  const { appCheck } = useAppCheck();

  const compress = async (file: File): Promise<Blob> => {
    const user: User | null = auth.currentUser;
    if (!appCheck) {
      console.log("App Check not initialized");
      throw new Error("App Check not initialized");
    }
    if (!user) throw new Error("Not authenticated");

    try {
      const [idToken, appCheckToken] = await Promise.all([
        user.getIdToken(),
        getToken(appCheck), // Get App Check token
      ]);

      const formData: FormData = new FormData();
      formData.append("file", file);

      const response: Response = await fetch("/api/compress-image", {
        method: "POST",
        headers: {
          "X-Firebase-AppCheck": await appCheckToken.token,
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData: CompressionErrorResponse = await response.json();
        throw new Error(
          errorData.error ||
            errorData.message ||
            `HTTP error! status: ${response.status}`
        );
      }

      return await response.blob();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Image compression failed: ${error.message}`);
      }
      throw new Error("Unknown error occurred during image compression");
    }
  };

  return compress;
}
