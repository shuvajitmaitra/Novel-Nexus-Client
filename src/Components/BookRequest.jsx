import axios from "axios";
import Container from "./Container";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BookRequest = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const { bookName } = data;

    axios
      .post("http://localhost:5000/book-request", {
        book_name: bookName,
      })
      .then((res) => {
        if (!res.data.insertedId) {
            toast.error("Already in request list");
            reset()
          return 
          }
        if (res.data.insertedId) {
            toast.success("Request Send Successfully");
            reset()
          return 
        }
      })
  };
  return (
    <Container className="bg-secondary bg-opacity-50 py-10 rounded-lg">
      <h1 className="text-3xl md:text-5xl py-6 font-bold text-primary text-center space-y-4">
        Put your book request
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-3/4 mx-auto flex justify-center items-center"
      >
        {/* ------------------------------------------------ */}
        {/* First row*/}
        {/* ------------------------------------------------ */}
        <div className="form-control">
          <input
            type="text"
            {...register("bookName")}
            name="bookName"
            placeholder=" Book Name"
            className="md:input py-3 border md:input-bordered "
            required
          />
        </div>
        {/* ------------------------------------------------ */}
        {/*Submit Button*/}
        {/* ------------------------------------------------ */}
        <button
          type="submit"
          className="btn btn-primary px-0 md:px-4"
        >
          Send Request
        </button>
      </form>
    </Container>
  );
};

export default BookRequest;
