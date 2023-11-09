import Container from "./Container";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import { LiaFilterSolid } from "react-icons/lia";

import { useState } from "react";
import axios from "axios";

import useAuth from "../Hook/useAuth";
import toast from "react-hot-toast";

const AllBook = () => {
  const { user, filterFunc } = useAuth();
  const userEmail = user.email;

  const [books, setBooks] = useState(null);

  const { isLoading, isError } = useQuery({
    queryFn: async () =>
      await axios
        .get(
          `https://assignment-11-novel-nexus-server.vercel.app/allBooks?email=${userEmail}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setBooks(res.data);
          console.log(res.data);
          return res.data;
        }),
    queryKey: ["bookData"],
  });
  if (isLoading) {
    return (
      <span className="h-screen flex justify-center items-center">
        <progress className="progress w-56"></progress>
      </span>
    );
  }

  if (isError) {
    return <h2>Error</h2>;
  }
  const handleAvailableBook = (e) => {
    e.preventDefault();
    const filter = e.target.filter.value;
    console.log(filter);
    filterFunc();

    if (filter == "Filter") {
      return toast.error("Please choose a option")
    }else if(filter == "Available Book"){
      axios
        .get(
          `https://assignment-11-novel-nexus-server.vercel.app/bookfilter?email=${userEmail}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setBooks(res.data);
          // console.log(res.data);
          return res.data;
        });
    }
     else {
      axios
        .get(
          `https://assignment-11-novel-nexus-server.vercel.app/allbooks?email=${userEmail}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setBooks(res.data);
          console.log(res.data);
          return res.data;
        });
    }
  };

  return (
    <Container>
      <h3 className="text-3xl md:text-6xl py-6 font-bold text-primary text-center">
        All Books here!
      </h3>
      <form
        onSubmit={handleAvailableBook}
        className="my-5 flex h-full"
      >
        <select
          name="filter"
          className=" border outline-none rounded-l-lg"
        >
          <option value="Filter">Filter</option>
          <option value="All Book">All Books</option>
          <option value="Available Book">Available Book</option>
        </select>
        <button
          type="submit"
          className="rounded-r-lg rounded-l-none bg-primary hover:bg-blue-600 text-white rounded py-2 px-4 focus:outline-none transition-transform hover:scale-105"
        >
          Filter
        </button>
      </form>

      {/* <LiaFilterSolid></LiaFilterSolid> See All Available Books
      </button> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books?.map((book) => (
          <div
            key={book._id}
            className="relative flex flex-col bg-gradient-to-r  from-blue-200 to-blue-300 text-gray-800 p-8 rounded shadow-lg hover:shadow-md transform hover:scale-105 transition-transform space-y-2"
          >
            {book.book_quantity < 1 && (
              <span className="absolute top-3 left-3 bg-red-500 px-2 mx-3 my-4 text-white text-lg rounded-sm">
                {" "}
                Not Available
              </span>
            )}
            <img
              src={book.image}
              alt={book.book_name}
              className="block right-0 left-0 mx-auto w-64 h-72 object-cover rounded-lg"
            />
            <h2 className="text-2xl font-semibold">{book.book_name}</h2>
            <p className=" text-gray-500">Author: {book.author_name}</p>
            <div className="flex justify-between items-center ">
              <p className="text-base text-gray-500">
                Category: {book.category}
              </p>
              <p className="text-base text-gray-500">
                Quantity: {book.book_quantity}
              </p>
            </div>
            <p className=" flex items-center text-base text-gray-500">
              Rating:{" "}
              <StarRating rating={parseFloat(book.book_rating)}></StarRating> (
              {book.book_rating})
            </p>

            <div className="flex-grow"></div>

            <div className=" flex justify-center gap-3">
              <Link to={`/update-book/${book._id}`}>
                <button className="bg-accent hover:bg-green-400 text-white rounded py-2 px-4 focus:outline-none transition-transform hover:scale-105">
                  Update
                </button>
              </Link>
              <Link to={`/bookDetails/${book._id}`}>
                <button className="bg-primary hover:bg-blue-600 text-white rounded py-2 px-4 focus:outline-none transition-transform hover:scale-105">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AllBook;
