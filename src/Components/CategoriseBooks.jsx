import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarRating from "./StarRating";
import Container from "./Container";
import axios from "axios";

const CategoriseBooks = () => {
  const [books, setBooks] = useState([]);
  const { book_category } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://assignment-11-novel-nexus-server.vercel.app/categorizedBooks?book_category=${book_category}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setBooks(res.data);
      });
  }, [book_category]);
  return (
    <Container>
      <h3 className="text-3xl md:text-6xl py-6 font-bold text-primary text-center">
        {book_category} Books here!
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books?.map((book) => (
          <div
            key={book._id}
            className="flex flex-col bg-gradient-to-r  from-blue-200 to-blue-300 text-gray-800 p-8 rounded shadow-lg hover:shadow-md transform hover:scale-105 transition-transform space-y-2 relative"
          >
            <img
              src={book.image}
              alt={book.book_name}
              className="block right-0 left-0 mx-auto w-64 h-72 object-cover rounded-lg"
            />
            {book.book_quantity < 1 && (
              <span className="absolute top-5 left-3 bg-red-500 px-2 mx-3 my-4 text-white text-lg rounded-sm">
                {" "}
                Not Available
              </span>
            )}
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

            <Link to={`/bookDetails/${book._id}`}>
              <button className="bg-primary hover:bg-blue-600 text-white rounded py-2 px-4 focus:outline-none transition-transform hover:scale-105">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default CategoriseBooks;
