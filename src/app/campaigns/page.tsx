"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ImagePicker from "@/components/basis/ImagePicker";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import useCampaigns from "./hooks/useCampaigns";

export default function Campaigns() {
  const { campaigns, error, loading, save, success } = useCampaigns();

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
                  defaultImage={campaigns[index]?.campaignDownloadUrl}
                  placeholder="Selecione a imagem da campanha"
                  onChange={(event) => {
                    if (event.target.files)
                      save(`campanha-${n}`, event.target.files[0]);
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </LoadingContainer>
    </>
  );
}
