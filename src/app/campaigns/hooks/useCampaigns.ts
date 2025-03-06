import { errorMessage, successMessage } from "@/utils/texts";
import { useEffect, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import Campaign from "@/helpers/firestore/model/campaign/campaign";
import { Folders } from "@/helpers/storage/folders";
import useStorage from "@/helpers/storage/hooks/useStorage";

export default function useCampaigns() {
  const { upload, remove: removeStorage } = useStorage(Folders.Campanhas);
  const { set, get, remove: removeFirebase } = useFirebase();

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
        setError(errorMessage("ao obter as campanhas"));
        setLoading(false);
      },
    });
  }, []);

  const deleteCampaign = async (id: string) => {
    setSuccess(null);
    setLoading(true);
    setError(null);

    return await removeStorage({
      id: id,
      onError: () => {
        setError(errorMessage("ao cadastrar campanha."));
        setLoading(false);
      },
      onSuccess: async () => {
        removeFirebase({
          id: id,
          onSuccess: () => {
            setSuccess(successMessage("Campanha removida"));
            setLoading(false);
          },
          onError: () => {
            setError(errorMessage("ao remover a campanha"));
            setLoading(false);
          },
          onData: setCampaigns,
          collection: collection,
          data: campaigns,
        });
      },
    });
  };

  const save = async (id: string, file?: File) => {
    setSuccess(null);

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
              setSuccess(successMessage("Campanha cadastrada"));
              setCampaigns((c) => [...c, new Campaign(id, imagePath)]);
              setLoading(false);
            },
            onError: () => {
              setError(errorMessage("ao cadastrar a campanha"));
              setLoading(false);
            },
            collection,
            body: new Campaign(id, imagePath),
          });
        },
      });
    }
  };
  return { deleteCampaign, save, success, loading, error, campaigns };
}
