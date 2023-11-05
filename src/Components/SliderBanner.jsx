import image1 from "../assets/library/library-1.jpg";
import image2 from "../assets/library/library-2.jpg";
import image3 from "../assets/library/library-3.jpg";
import image4 from "../assets/library/library-4.jpg";
import { A11y, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SwiperNavButtons } from "./SwiperNavButtons";

const SliderBanner = () => {
  return (
    <div>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide>
          <img
            src={image1}
            className="h-[80vh] rounded-lg w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image2}
            className="h-[80vh] rounded-lg w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image3}
            className="h-[80vh] rounded-lg w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image4}
            className="h-[80vh] rounded-lg w-full object-cover"
          />
        </SwiperSlide>
        <div className="absolute top-1/2 z-50 right-0 left-0">
          <SwiperNavButtons></SwiperNavButtons>
        </div>
      </Swiper>
    </div>
  );
};

export default SliderBanner;
