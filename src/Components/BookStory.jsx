import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import Container from "./Container";
import generatePDF from "react-to-pdf";
import axios from "axios";

const BookStory = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const { book_name, book_summary } = book;

  useEffect(() => {
    axios
      .get(`https://assignment-11-novel-nexus-server.vercel.app/books/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setBook(res.data);
      });
  }, [id]);

  // --------------------------------------------
  // generate pdf
  // --------------------------------------------

  const options = {
    page: {
      format: "letter",
      orientation: "landscape",
    },
  };

  const target = () => document.getElementById("container");
  return (
    <div className="bg-gradient-to-r from-blue-500 via-a2d0f7 to-teal-200 ">
      <div
        id="container"
        className="min-h-screen relative flex flex-col items-center space-y-3 py-20 "
      >
        <h1 className="py-5 md:py-10 px-5 rounded-full lg:w-1/2 mx-auto bg-white text-center font-bold text-2xl lg:text-4xl">
          {book_name}
        </h1>
        <span className="md:w-1/3  mx-auto text-center rounded-full p-3 bg-white font-semibold">
          Summary of the book
        </span>
        <span className="md:w-2/3 p-5 bg-white rounded-lg">{book_summary}</span>
      </div>
      <div className="flex gap-3 absolute  top-5 right-10">
        <Link to={`/bookDetails/${id}`}>
          <button className="bg-error hover:bg-blue-600 text-white rounded py-2 px-4 focus:outline-none transition-transform hover:scale-105">
            Go back
          </button>
        </Link>
        <button
          onClick={() => generatePDF(target, options, { filename: "page.pdf" })}
          className="  bg-primary hover:bg-blue-600 text-white rounded py-2 px-4 focus:outline-none transition-transform hover:scale-105"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default BookStory;
