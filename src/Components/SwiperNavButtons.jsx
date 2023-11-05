import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useSwiper } from "swiper/react";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="flex justify-between">
      <button
        onClick={() => swiper.slidePrev()}
        className="text-3xl mx-2 lg:text-5xl bg-primary  hover:bg-white rounded-full text-zinc-300 hover:text-primary"
      >
        <BsArrowLeftCircleFill />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="text-3xl mx-2 lg:text-5xl bg-primary  hover:bg-white rounded-full text-zinc-300 hover:text-primary"
      >
        <BsArrowRightCircleFill />
      </button>
    </div>
  );
};
