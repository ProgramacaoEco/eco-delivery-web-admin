import {
  ChangeEvent,
  ComponentProps,
  useEffect,
  useRef,
  useState,
} from "react";
import { fileInput, picker } from "./style.css";

import { default as Image } from "next/image";
import { Typography } from "../Typography";

export default function ImagePicker({
  defaultImage,
  placeholder,
  onChange,
  ...props
}: ComponentProps<"input"> & { defaultImage?: string }) {
  const [image, setImage] = useState<string | undefined>(defaultImage);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  // Update image state when defaultImage changes
  useEffect(() => {
    setImage(defaultImage);
  }, [defaultImage]);

  return (
    <label className={picker}>
      {image && image !== null && image.length > 0 ? (
        <Image
          ref={imageRef}
          priority
          src={image!}
          alt="Imagem do produto"
          height={400}
          width={400}
          style={{
            height: "25.9rem",
            width: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <Typography.DisplayMediumBold>
          {placeholder}
        </Typography.DisplayMediumBold>
      )}
      <input
        {...props}
        className={fileInput}
        type="file"
        accept=".jpeg,.jpg,.png"
        onChange={(event) => {
          handleImage(event);
          if (onChange) onChange(event);
        }}
      />
    </label>
  );
}
