import { A11y, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SwiperNavButtons } from "./SwiperNavButtons";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/useAxiosSecure";

const SliderBanner = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: sliders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["slider"],
    queryFn: async () =>
      await axiosSecure.get("/slider").then((res) => {
        return res.data;
      }),
  });

  if (isLoading) {
    return (
      <span className="h-screen flex justify-center items-center">
        <progress className="progress w-56"></progress>
      </span>
    );
  }

  if (isError) {
    return (
      <div className="h-1/2 flex justify-center items-center">
        <h3 className="text-3xl md:text-6xl py-6 font-bold text-primary text-center">
          There is an error 😒
        </h3>
      </div>
    );
  }
  return (
    <div>
      <Swiper
        modules={[Navigation, A11y]}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
      >
        {sliders?.map((slider) => (
          <SwiperSlide key={slider._id}>
            <img
              src={slider.image}
              className="h-[80vh] rounded-lg w-full object-cover"
            />
          </SwiperSlide>
        ))}

        <div className="absolute top-1/2 z-50 right-0 left-0">
          <SwiperNavButtons></SwiperNavButtons>
        </div>
      </Swiper>
    </div>
  );
};

export default SliderBanner;
