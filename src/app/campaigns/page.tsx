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
import { swiperContainer } from "./style.css";
import useCampaigns from "./hooks/useCampaigns";
import useMediaQuery from "@/hooks/useMediaQuery";
import { viewPort } from "@/theme/constants";

export default function Campaigns() {
  const { campaigns, error, loading, save, success, deleteCampaign } =
    useCampaigns();

  const matchQuerySmall = useMediaQuery(viewPort.small);

  return (
    <>
      <PageTitle isLoading={loading} dark color="white" title="Campanhas" />
      <LoadingContainer loading={loading} error={error !== null}>
        <Swiper
          resizeObserver
          className={swiperContainer}
          navigation={matchQuerySmall}
          centeredSlidesBounds
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          centeredSlides
          spaceBetween={10}
          slidesPerView={matchQuerySmall ? 1 : 3}
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
