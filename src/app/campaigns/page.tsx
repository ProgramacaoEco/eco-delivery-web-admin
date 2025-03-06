"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ActionFeedback from "@/components/basis/ActionFeedback";
import ImagePicker from "@/components/basis/ImagePicker";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import useCampaigns from "./hooks/useCampaigns";

export default function Campaigns() {
  const { campaigns, error, loading, save, success, deleteCampaign } =
    useCampaigns();

  return (
    <>
      <PageTitle isLoading={loading} dark color="white" title="Campanhas" />
      <LoadingContainer loading={loading} error={error !== null}>
        <Swiper
          resizeObserver
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "60vh",
          }}
          navigation
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          centeredSlides
          spaceBetween={10}
          slidesPerView={3}
        >
          {Array.from(Array(3).keys()).map((n, index) => {
            return (
              <SwiperSlide id={`campanha-${n}`} key={`campanha-${n}`}>
                <ImagePicker
                  onRemove={() => deleteCampaign(campaigns[index].id)}
                  defaultImage={campaigns[index]?.campaignDownloadUrl}
                  placeholder="Selecione a imagem da campanha"
                  onChange={async (event) => {
                    if (campaigns[index]) {
                      await deleteCampaign(`campanha-${n}`);
                    }
                    if (event.target.files)
                      save(`campanha-${n}`, event.target.files[0]);
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </LoadingContainer>
      {success && (
        <ActionFeedback
          open={!!success}
          message={success}
          state="success"
          autoHideDuration={3000}
        />
      )}
      {error && <ActionFeedback open={!!error} message={error} state="error" />}
    </>
  );
}
