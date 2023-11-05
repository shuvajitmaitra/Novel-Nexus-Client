import axios from "axios";
import { useEffect, useState } from "react";

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
        <div>
            <h3>all book</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    books?.map(book=>
                        <div key={book._id}>
                            <img src={book.image} alt="" />
                            <h2>{book.book_name}</h2>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default AllBook;