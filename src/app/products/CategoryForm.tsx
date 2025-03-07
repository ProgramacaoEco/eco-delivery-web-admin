import { ChangeEvent, useEffect, useState } from "react";
import { form, formFields } from "./style.css";

import { Category } from "@/helpers/firestore/model/product/category";
import ImagePicker from "@/components/basis/ImagePicker";
import InputText from "@/components/basis/InputText/InputText";
import LoadingContainer from "@/components/basis/LoadingContainer";
import RoundedButton from "@/components/basis/Button/RoundedButton";
import { useForm } from "react-hook-form";

interface CategoryFormProps {
  defaultValue?: Category | null;
  onSubmit: (category: Category, file?: File) => void;
  loading: boolean;
  error: string | null;
}

export default function CategoryForm({
  onSubmit,
  defaultValue,
  loading,
  error,
}: CategoryFormProps) {
  const [image, setImage] = useState<string | undefined>(
    defaultValue?.pictureUrl
  );
  const [binaryImage, setBinaryImage] = useState<File | undefined>(undefined);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setBinaryImage(event.target.files[0]);
    }
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Category>({
    defaultValues: {
      id: "",
      name: "",
      pictureUrl: "",
    },
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (defaultValue !== null && defaultValue !== undefined) {
      const { id, name, pictureUrl } = defaultValue;

      reset({ id, name, pictureUrl });

      setImage(image);
    }
  }, [defaultValue, image, reset]);

  const submit = () =>
    handleSubmit(({ id, name, pictureUrl }, event) => {
      event?.preventDefault();
      if (
        Object.entries(errors).find(([_, value]) => value.message !== undefined)
      )
        return;

      onSubmit(new Category(id, name, pictureUrl), binaryImage);
      reset();
    });

  return (
    <LoadingContainer loading={loading} error={error !== null}>
      <form onSubmit={submit()} className={form}>
        <ImagePicker
          defaultImage={defaultValue?.pictureUrl}
          placeholder="Selecione a imagem da categoria"
          onChange={handleImage}
        />

        <div className={formFields}>
          <InputText
            {...register("name", {
              required: "The category must have a valid description",
            })}
            id="nome"
            maxLength={24}
            error={errors.name?.message !== undefined}
            label="Nome da categoria"
          />
          <RoundedButton type="submit" buttonColor="orange">
            Salvar
          </RoundedButton>
        </div>
      </form>
    </LoadingContainer>
  );
}
