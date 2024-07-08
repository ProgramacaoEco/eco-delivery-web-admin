"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FormControl, InputLabel } from "@mui/material";
import { fileInput, fileInputImage, picker } from "./style.css";

import Dropdown from "@/components/basis/Dropdown";
import DropdownItem from "@/components/basis/Dropdown/DropdownItem";
import DropdownLabel from "@/components/basis/Dropdown/DropdownLabel";
import Image from "next/image";
import InputText from "@/components/basis/InputText/InputText";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import { Typography } from "@/components/basis/Typography";

export default function Products() {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <PageTitle color="orange" title="Cadastro de produtos" />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label className={picker}>
          {image.length > 0 ? (
            <Image
              src={image}
              alt="Imagem do produto"
              height={0}
              width={0}
              style={{
                height: "25.9rem",
                width: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <Typography.DisplayMediumBold>
              Selecione a imagem do produto
            </Typography.DisplayMediumBold>
          )}
          <input
            className={fileInput}
            type="file"
            accept=".jpeg,.jpg,.png"
            onChange={handleImage}
          />
        </label>

        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <InputText label="Código" />
          <InputText label="Descrição" />
          <InputText label="Valor" />

          <FormControl>
            <DropdownLabel id="categoria">Categoria</DropdownLabel>
            <Dropdown
              labelId="categoria"
              label="Categoria"
              value={category}
              onChange={({ target }) => setCategory(target.value as string)}
            >
              <DropdownItem value="1">1</DropdownItem>
              <DropdownItem value="1">1</DropdownItem>
              <DropdownItem value="1">1</DropdownItem>
              <DropdownItem value="1">1</DropdownItem>
              <DropdownItem value="1">1</DropdownItem>
              <DropdownItem value="1">1</DropdownItem>
              <DropdownItem value="1">1</DropdownItem>
            </Dropdown>
          </FormControl>
        </div>
      </form>
    </>
  );
}
