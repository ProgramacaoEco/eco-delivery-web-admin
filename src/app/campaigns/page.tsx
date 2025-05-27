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
      <LoadingContainer loading={loading} error={error !== null}>
        <Swiper
          observer
          observeSlideChildren
          resizeObserver
          updateOnWindowResize
          className={swiperContainer}
          navigation={matchQuerySmall}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={matchQuerySmall ? 1 : 3}
        >
          <SwiperSlide id={"campaign-1"} key={"campaign-1"}>
            <ImagePicker
              id={"campaign-1"}
              key={"campaign-1"}
              onRemove={() => deleteCampaign("campaign-1")}
              defaultImage={campaigns.get("campaign-1")?.campaignDownloadUrl}
              placeholder="Selecione a imagem da campanha"
              onChange={async (event) => {
                if (campaigns.has("campaign-1")) {
                  await deleteCampaign("campaign-1");
                }
                if (event.target.files)
                  save("campaign-1", event.target.files[0]);
              }}
            />
          </SwiperSlide>
          <SwiperSlide id={"campaign-2"} key={"campaign-2"}>
            <ImagePicker
              id={"campaign-2"}
              key={"campaign-2"}
              onRemove={() => deleteCampaign("campaign-2")}
              defaultImage={campaigns.get("campaign-2")?.campaignDownloadUrl}
              placeholder="Selecione a imagem da campanha"
              onChange={async (event) => {
                if (campaigns.has("campaign-2")) {
                  await deleteCampaign("campaign-2");
                }
                if (event.target.files)
                  save("campaign-2", event.target.files[0]);
              }}
            />
          </SwiperSlide>
          <SwiperSlide id={"campaign-3"} key={"campaign-3"}>
            <ImagePicker
              id={"campaign-3"}
              key={"campaign-3"}
              onRemove={() => deleteCampaign("campaign-3")}
              defaultImage={campaigns.get("campaign-3")?.campaignDownloadUrl}
              placeholder="Selecione a imagem da campanha"
              onChange={async (event) => {
                if (campaigns.has("campaign-3")) {
                  await deleteCampaign("campaign-3");
                }
                if (event.target.files)
                  save("campaign-3", event.target.files[0]);
              }}
            />
          </SwiperSlide>
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
