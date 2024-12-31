import Loading from "../Loading";
import { PropsWithChildren } from "react";
import { Typography } from "../Typography";
import { loadingContainer } from "./style.css";

interface LoadingContainerProps {
  error: boolean;
  loading: boolean;
}
export default function LoadingContainer({
  error,
  loading,
  children,
}: PropsWithChildren<LoadingContainerProps>) {
  if (loading && !error) {
    return (
      <div className={loadingContainer}>
        <Loading />
      </div>
    );
  }

  if (!loading && error) {
    return (
      <div className={loadingContainer}>
        <Typography.TitleBold>
          Desculpe-nos, parece que algo de errado aconteceu. Por favor,
          recarregue a página e tente novamente. Se o erro persistir, contate o
          suporte.
        </Typography.TitleBold>
      </div>
    );
  }

  return children;
}
