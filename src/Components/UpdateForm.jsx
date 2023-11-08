import { useForm } from "react-hook-form";
import Container from "./Container";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../Hook/useAxiosSecure";

// import { AuthContext } from "../Provider/AuthProvider";

const UpdateForm = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure(navigate);
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const [books, setBooks] = useState({});
  // const {loading} = useContext(AuthContext)

  useEffect(() => {
    axiosSecure
      .get(`/books/${id}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        {
          error && console.log(error);
          toast.error("Something wrong try again later");
        }
      });
  }, [id, axiosSecure]);

  // console.log(books);
  const onSubmit = (data) => {
    const {
      bookName,
      bookImage,
      bookQuantity,
      authorName,
      category,
      sortDescription,
      bookRating,
      bookSummary,
    } = data;

    axiosSecure
      .put("/books", {
        book_name: bookName,
        image: bookImage,
        book_quantity: bookQuantity,
        author_name: authorName,
        category: category,
        book_rating: bookRating,
        short_description: sortDescription,
        book_summary: bookSummary,
      })
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Book Updated Successfully");
          navigate("/all-book");
          return;
        }
      })
      .then((error) => {
        toast.error(error);
      });
  };

  return (
    <Container>
      <h1 className="text-3xl md:text-6xl py-6 font-bold text-primary text-center">
        Update Books Here!
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body lg:w-3/4 mx-auto"
      >
        {/* ------------------------------------------------ */}
        {/* First row*/}
        {/* ------------------------------------------------ */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Book Name</span>
            </label>
            <input
              type="text"
              {...register("bookName")}
              name="bookName"
              defaultValue={books.book_name}
              placeholder="Book Name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Book Image</span>
            </label>
            <input
              type="text"
              {...register("bookImage")}
              name="bookImage"
              defaultValue={books.image}
              placeholder="Book Image"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        {/* ------------------------------------------------ */}
        {/* Second row*/}
        {/* ------------------------------------------------ */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="form-control flex-1 ">
            <label className="label">
              <span className="label-text">Book Quantity (Number)</span>
            </label>
            <input
              type="number"
              min="1"
              {...register("bookQuantity")}
              name="bookQuantity"
              defaultValue={books.book_quantity}
              placeholder="Book Quantity"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Author Name</span>
            </label>
            <input
              type="text"
              {...register("authorName")}
              name="authorName"
              defaultValue={books.author_name}
              placeholder="Author Name"
              className="input input-bordered"
              required
            />
          </div>
        </div>
        {/* ------------------------------------------------ */}
        {/* Third row*/}
        {/* ------------------------------------------------ */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Book Category</span>
            </label>
            <select
              type="text"
              {...register("category")}
              name="category"
              className="input input-bordered rounded"
              required
            >
              <option>Choose a Category</option>
              <option value="History">History</option>
              <option value="Drama">Drama</option>
              <option value="Novel">Novel</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Sort Description</span>
            </label>
            <input
              type="text"
              {...register("sortDescription")}
              name="sortDescription"
              defaultValue={books.short_description}
              placeholder="Sort Description"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        {/* ------------------------------------------------ */}
        {/* Forth row*/}
        {/* ------------------------------------------------ */}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Book Rating (Number)</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="1"
              max="5"
              {...register("bookRating")}
              name="bookRating"
              placeholder="Book Summary"
              defaultValue={books.book_rating}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Book Summary</span>
            </label>
            <input
              type="text"
              {...register("bookSummary")}
              name="bookSummary"
              defaultValue={books.book_summary}
              placeholder="Book Summary"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        {/* ------------------------------------------------ */}
        {/*Submit Button*/}
        {/* ------------------------------------------------ */}
        <div className="form-control flex-1 mt-6">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Update Book
          </button>
        </div>
      </form>
    </Container>
  );
};

export default UpdateForm;
