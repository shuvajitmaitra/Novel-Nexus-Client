import Container from "./Container";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../Hook/useAuth";

const PostReview = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const { review, rating } = data;

    axios
      .post(
        "https://assignment-11-novel-nexus-server.vercel.app/reviews",
        {
          review,
          rating: parseFloat(rating),
          name: user.displayName,
          image: user.photoURL,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.insertedId) {
          axios
            .get(
              "https://assignment-11-novel-nexus-server.vercel.app/reviews",
              { withCredentials: true }
            )
            .then((res) => {
              toast.success("Successfully Review Posted");
              reset();
              return res.data;
            });
        }
      });
  };
  return (
    <Container className="bg-accent bg-opacity-50 py-10 rounded-lg">
      <h1 className="text-3xl md:text-5xl py-6 font-bold text-primary text-center space-y-4">
        Leave Your Review Here!
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/2 mx-auto bg-slate-300 border border-primary-content rounded-lg space-y-3 p-5 md:p-10 "
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Review Message</span>
          </label>
          <input
            type="text"
            {...register("review")}
            name="review"
            placeholder="Review Message"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <input
            type="number"
            {...register("rating")}
            min="1"
            max="5"
            name="rating"
            step="0.01"
            placeholder="Rating"
            className="input input-bordered"
            required
          />
        </div>

        {/* ------------------------------------------------ */}
        {/*Submit Button*/}
        {/* ------------------------------------------------ */}
        <div className="w-full mx-auto flex justify-center">
          <button
            type="submit"
            className="btn btn-primary text-center "
          >
            Post Review
          </button>
        </div>
      </form>
    </Container>
  );
};

export default PostReview;
