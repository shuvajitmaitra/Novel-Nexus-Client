import { A11y, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SwiperNavButtons } from "./SwiperNavButtons";
import { useQuery } from "@tanstack/react-query";

import StarRating from "./StarRating";
import axios from "axios";

const CustomerReviews = () => {
  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () =>
      await axios
        .get("https://assignment-11-novel-nexus-server.vercel.app/reviews")
        .then((res) => {
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
    <div className=" bg-accent bg-opacity-50 py-10 rounded-lg">
      <Swiper
        modules={[Navigation, A11y]}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
      >
        {reviews?.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="h-[50vh] flex flex-col items-center justify-center space-y-4 ">
              <img
                src={review.image}
                className="rounded-full border-4 border-white w-24 h-24 object-cover"
              />
              <h2 className="text-center font-bold text-3xl md:text-5xl">
                {review.name}
              </h2>
              <p className="text-center">{review.review}</p>
              <p className=" flex items-center text-base text-gray-500">
                Rating: <StarRating rating={review.rating}></StarRating>
              </p>
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute top-1/2 z-50 right-0 left-0">
          <SwiperNavButtons></SwiperNavButtons>
        </div>
      </Swiper>
    </div>
  );
};

export default CustomerReviews;
