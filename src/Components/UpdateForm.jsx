import Container from "./Container";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../Hook/useAuth";

const UpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [books, setBooks] = useState({});

  const { filterFunc } = useAuth();
  // const userEmail = user?.email
  //   form er default value er jonno data load hosche............
  useEffect(() => {
    axios
      .get(`https://assignment-11-novel-nexus-server.vercel.app/books/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        return setBooks(res.data);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookName = e.target.bookName.value;
    const bookImage = e.target.bookImage.value;
    const bookQuantity = parseFloat(e.target.bookQuantity.value);
    const authorName = e.target.authorName.value;
    const category = e.target.category.value;
    const sortDescription = e.target.sortDescription.value;
    const bookRating = e.target.bookRating.value;
    const bookSummary = e.target.bookSummary.value;
    if (category == "Choose a category") {
      return toast.error("Please select a category");
    }
    axios
      .put(
        `https://assignment-11-novel-nexus-server.vercel.app/update-books/${id}`,
        {
          book_name: bookName,
          image: bookImage,
          book_quantity: bookQuantity,
          author_name: authorName,
          category: category,
          book_rating: bookRating,
          short_description: sortDescription,
          book_summary: bookSummary,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          filterFunc();
          toast.success("Book Updated Successfully");
          navigate("/all-book");
          return;
        }
      });
  };

  return (
    <Container>
      <h1 className="text-3xl md:text-6xl py-6 font-bold text-primary text-center">
        Update Books Here!
      </h1>
      <form
        onSubmit={handleSubmit}
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
              name="bookImage"
              defaultValue={books.image}
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
              min="0"
              name="bookQuantity"
              defaultValue={books.book_quantity}
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
              name="authorName"
              defaultValue={books.author_name}
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
              name="category"
              className="input input-bordered rounded"
              required
            >
              <option
                selected
                disabled
              >
                Choose a category
              </option>
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
              name="sortDescription"
              defaultValue={books.short_description}
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
              name="bookRating"
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
              name="bookSummary"
              defaultValue={books.book_summary}
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
