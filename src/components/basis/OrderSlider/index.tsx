import Flicking from "@egjs/react-flicking";
import { PropsWithChildren } from "react";
import { orderSlider } from "./style.css";

export default function OrderSlider({ children }: PropsWithChildren) {
  return (
    <Flicking
      cameraClass={orderSlider}
      autoInit
      autoResize
      useFindDOMNode
      useResizeObserver
      align="prev"
      inputType={["mouse", "touch"]}
    >
      {children}
    </Flicking>
  );
}
