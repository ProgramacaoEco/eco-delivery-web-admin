import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Category } from "@/helpers/firestore/enum/category";
import { CurrencyInput } from "react-currency-mask";
import Dropdown from "@/components/basis/Dropdown";
import DropdownItem from "@/components/basis/Dropdown/DropdownItem";
import ImagePicker from "@/components/basis/ImagePicker";
import InputText from "@/components/basis/InputText/InputText";
import LoadingContainer from "@/components/basis/LoadingContainer";
import { Product } from "@/helpers/firestore/model/product/product";
import RoundedButton from "@/components/basis/Button/RoundedButton";

interface ProductFormProps {
  defaultValue?: Product | null;
  onSubmit: (product: Product, file?: File) => void;
  loading: boolean;
  error: string | null;
}

export default function ProductForm({
  onSubmit,
  defaultValue,
  loading,
  error,
}: ProductFormProps) {
  const [image, setImage] = useState<string | undefined>(defaultValue?.image);
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
    control,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      id: "",
      category: Category.Cervejas,
      value: 0,
      inventory: 0,
    },
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (defaultValue !== null && defaultValue !== undefined) {
      const { id, category, description, image, value, inventory } =
        defaultValue;

      reset({ id, category, description, image, value, inventory });

      setImage(image);
    }
  }, [defaultValue, reset]);

  const submit = () =>
    handleSubmit(({ id, category, description, value, inventory }, event) => {
      event?.preventDefault();
      if (
        Object.entries(errors).find(([_, value]) => value.message !== undefined)
      )
        return;

      onSubmit(
        new Product(id, description, value, category, inventory, image),
        binaryImage
      );
      reset();
    });

  return (
    <LoadingContainer loading={loading} error={error !== null}>
      <form
        onSubmit={submit()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ImagePicker
          defaultImage={defaultValue?.image}
          placeholder="Selecione a imagem do produto"
          onChange={handleImage}
        />

        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <Controller
            control={control}
            name="id"
            render={({ field }) => (
              <InputText
                {...field}
                value={field.value}
                onChange={(e) =>
                  field.onChange(e.target.value.replace(/\s/g, ""))
                }
                id="id"
                error={errors.id?.message !== undefined}
                label="Código"
              />
            )}
          />
          <InputText
            {...register("description", {
              required: "The product must have a valid description",
            })}
            id="descricao"
            error={errors.description?.message !== undefined}
            label="Descrição"
          />
          <Controller
            control={control}
            name="inventory"
            render={({ field }) => (
              <InputText
                {...field}
                value={field.value} // Ensure there's always a value (default to 0 if undefined)
                onChange={(e) =>
                  field.onChange(e.target.value.replace(/\D/g, ""))
                }
                id="estoque"
                label="Estoque"
                type="number"
              />
            )}
          />
          <Controller
            control={control}
            name="value"
            rules={{
              min: 0.01,
            }}
            render={({ field }) => (
              <CurrencyInput
                {...field}
                onChangeValue={(_, value) => {
                  field.onChange(value);
                }}
                InputElement={
                  <InputText
                    id="valor"
                    error={errors.value?.message !== undefined}
                    label="Valor"
                    mask="R$ "
                  />
                }
              />
            )}
          />

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Dropdown
                {...field}
                id="categoria"
                label="Categoria"
                name="Categoria"
              >
                {Object.entries(Category).map(([key, value]) => (
                  <DropdownItem key={key} value={value}>
                    {value.toString()}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          />
          <RoundedButton type="submit" buttonColor="orange">
            Salvar
          </RoundedButton>
        </div>
      </form>
    </LoadingContainer>
  );
}
