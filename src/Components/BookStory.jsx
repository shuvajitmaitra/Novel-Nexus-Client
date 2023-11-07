import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "./Container";

const BookStory = () => {
    const {id} = useParams()
    const [book, setBook] = useState([]);
    const {
        book_name,
        book_summary
      } = book;
   
    useEffect(() => {
      axios.get(`http://localhost:5000/books/${id}`).then((res) => {
        setBook(res.data);
      });
    }, [id]);
    return (
       <div className="bg-gradient-to-r from-blue-500 via-a2d0f7 to-teal-200 ">
         <Container className="min-h-screen flex flex-col items-center space-y-3 p-5 md:p-10"
       >
            <h1 className="py-5 md:py-10 px-5 rounded-full lg:w-1/2 mx-auto bg-white text-center font-bold text-2xl lg:text-4xl">{book_name}</h1>
            <span className="md:w-1/3  mx-auto text-center rounded-full p-3 bg-white font-semibold">
                Summary of the book
            </span>
            <span className="md:w-2/3 p-5 bg-white rounded-lg">
                {book_summary}
            </span>
            <Link to={`/bookDetails/${id}`}>
            <button className="bg-error hover:bg-blue-600 text-white rounded py-2 px-4 focus:outline-none transition-transform hover:scale-105">
                                Go back
                              </button>
            </Link>
        </Container>
       </div>
    );
};

export default BookStory;