import Lottie from "lottie-react";
import animationData from "../../../../public/loading.json";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Lottie
        style={{ width: "10rem", height: "10rem" }}
        animationData={animationData}
      />
    </div>
  );
}
