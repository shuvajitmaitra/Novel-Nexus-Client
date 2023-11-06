import axios from "axios";
import { useEffect, useState } from "react";
import Container from "./Container";
import StarRating from "./StarRating";

const AllBook = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:5000/books")
          .then((res) => {
            console.log(res.data);
            setBooks(res.data);
          })
          .then((error) => {
            console.log(error);
          });
      }, []);
    return (
        <Container>
              <h3 className="text-3xl md:text-6xl py-6 font-bold text-primary text-center">
        All Books here!
      </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    books?.map(book=>
                        <div key={book._id} className="flex flex-col bg-gradient-to-r  from-blue-200 to-blue-300 text-gray-800 p-8 rounded shadow-lg hover:shadow-md transform hover:scale-105 transition-transform space-y-2">
                            <img
                              src={book.image}
                              alt={book.book_name}
                              className="block right-0 left-0 mx-auto w-64 h-72 object-cover rounded-lg"
                            />
                            <h2 className="text-2xl font-semibold">
                              {book.book_name}
                            </h2>
                            <p className=" text-gray-500">Author: {book.author_name}</p>
                           <div className="flex justify-between items-center ">
                           <p className="text-base text-gray-500">Category: {book.category}</p>
                              <p className=" flex items-center text-base text-gray-500">Rating: <StarRating rating={book.book_rating}></StarRating></p>
                           </div>
             
             <div className="flex-grow"></div>
                          
                            <div className=" flex justify-center gap-3">
                              <button className="bg-accent hover:bg-green-400 text-white rounded py-2 px-4 focus:outline-none transition-transform hover:scale-105">
                                Update
                              </button>
                              <button className="bg-error hover:bg-blue-600 text-white rounded py-2 px-4 focus:outline-none transition-transform hover:scale-105">
                                Delete
                              </button>
                            </div>
                          </div>
                  
                  
                    )
                }
            </div>

        </Container>
    );
};

export default AllBook;