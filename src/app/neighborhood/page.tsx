"use client";

import ActionFeedback from "@/components/basis/ActionFeedback";
import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import Neighborhood from "@/helpers/firestore/model/neighborhood/neighborhood";
import NewNeighborhoodForm from "./NewNeighborhoodForm";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import useNeighborhood from "./hooks/useNeighborhood";

export default function NeighborhoodPage() {
  const {
    error,
    loading,
    neighborhoods,
    removeNeighborhood,
    setNeighborhood,
    success,
  } = useNeighborhood();

  return (
    <>
      <PageTitle isLoading={loading} color="#81D1F0" title="Bairros" />
      <LoadingContainer loading={loading} error={error !== null}>
        <div>
          <div style={{ marginTop: "20px", width: "inherit" }}>
            <NewNeighborhoodForm
              onSubmit={async ({ freightCost, neighborhoodName }) => {
                const neighborhoodId = `${neighborhoodName?.at(
                  0
                )}${neighborhoodName?.at(1)}-${Math.round(
                  new Date().getTime() / 1000
                )}`;
                setNeighborhood(
                  new Neighborhood(
                    neighborhoodId,
                    neighborhoodName!,
                    freightCost!
                  )
                );
              }}
            />
          </div>

          <ListTile>
            {neighborhoods.length > 0 &&
              neighborhoods.map(
                ({ neighborhoodName, freightCost, id }: Neighborhood) =>
                  id && (
                    <Tile
                      key={id}
                      isDeletable
                      onDelete={() => removeNeighborhood(id)}
                    >
                      {neighborhoodName} - R$
                      {freightCost?.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </Tile>
                  )
              )}
          </ListTile>
        </div>
        {error && (
          <ActionFeedback
            message={error}
            autoHideDuration={3000}
            open={error.length > 0}
            state="error"
          />
        )}
        {success && (
          <ActionFeedback
            message={success}
            open={success.length > 0}
            state="success"
            autoHideDuration={3000}
          />
        )}
      </LoadingContainer>
    </>
  );
}
