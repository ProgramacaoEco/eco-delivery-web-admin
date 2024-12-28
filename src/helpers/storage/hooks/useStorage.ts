import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { app } from "@/firebase-config";

interface UploadParams {
  id: string;
  file: File;
  onSuccess?: (fullPath: string) => void;
  onError: () => void;
  onLoading: (loading: boolean) => void;
}

export default function useStorage() {
  const storage = getStorage(app);

  const folder = "Produtos/";

  const upload = async ({
    file,
    id,
    onError,
    onLoading,
    onSuccess,
  }: UploadParams) => {
    onLoading(true);
    try {
      const fileType = file.name.split(".").pop();
      const storageRef = ref(storage, `${folder}${id}.${fileType}`);

      const res = await uploadBytes(storageRef, file);

      if (res.ref.fullPath.length > 0) {
        const downloadUrl = await getDownloadURL(storageRef);
        if (onSuccess !== undefined) return onSuccess(downloadUrl);
      }

      throw Error("An error occurred trying to upload the file.");
    } catch (error) {
      console.error(error);
      onError();
    } finally {
      onLoading(false);
    }
  };

  return { upload };
}
