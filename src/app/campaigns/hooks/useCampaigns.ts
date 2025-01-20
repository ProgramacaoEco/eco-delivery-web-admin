import { errorMessage, successMessage } from "@/utils/texts";
import { useEffect, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import Campaign from "@/helpers/firestore/model/campaign/campaign";
import useStorage from "@/helpers/storage/hooks/useStorage";

export default function useCampaigns() {
  const { upload } = useStorage();
  const { set, get } = useFirebase();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const collection = Collections.Campanhas;

  useEffect(() => {
    setError(null);
    setLoading(true);
    get({
      collection: collection,
      transformer: (data) => new Campaign(data.id, data.campaignDownloadUrl),
      onData: (campaigns) => {
        setCampaigns(campaigns);
        setLoading(false);
      },
      onError: () => {
        setError(errorMessage("ao obter os usuários"));
        setLoading(false);
      },
    });
  }, []);

  const save = async (id: string, file?: File) => {
    setLoading(true);
    setError(null);

    if (file !== undefined) {
      return await upload({
        id: id,
        file: file,
        onError: () => {
          setError(errorMessage("ao cadastrar imagem do produto."));
          setLoading(false);
        },
        onSuccess: async (imagePath) => {
          set({
            onSuccess: () => {
              setSuccess(successMessage("Usuário adicionado"));
              setCampaigns((c) => [...c, new Campaign(id, imagePath)]);
              setLoading(false);
            },
            onError: () => {
              setError(errorMessage("ao adicionar o usuário"));
              setLoading(false);
            },
            collection,
            body: new Campaign(id, imagePath),
          });
        },
      });
    }
  };
  return { save, success, loading, error, campaigns };
}
