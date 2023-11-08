import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Container from "./Container";
import StarRating from "./StarRating";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/useAxiosSecure";

const BorrowedBook = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: borrowed, refetch } = useQuery({
    queryKey: ["borrowed"],
    queryFn: async () =>
      await axiosSecure
        .get(`/borrowed/${user.email}`)
        .then((res) => {
          return res.data;
        }),
  });

  const handleDelete = (objectId, id, quantity) => {
    let newQuantity = quantity + 1;
    // console.log(quantity, newQuantity);
    axiosSecure
      .put(`/books/${objectId}`, {
        book_quantity: newQuantity,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
          axiosSecure
            .delete(`/borrowed/${id}`)
            .then((res) => {
              console.log(res.data);
              if (res.data.deletedCount > 0) {
                // re fetching data
                // axios
                // .get(`/borrowed/${user.email}`)
                // .then(() => {
                //   return toast.success("Book Return Successfully!");

                // })
                // .catch((error) => {
                //   {
                //     error && console.log(error);
                //     toast.error("Something wrong try again later");
                //   }
                // });
                refetch();
                // refetching end...........
              }
              if (!res.data.deletedCount > 0) {
                return toast.error(59, "Something wrong try again later");
              }
            })
            .catch((error) => {
              {
                error && error && console.log(error);
                toast.error("Something wrong try again later");
              }
            });
        }
      })
      .catch((error) => {
        {
          error && console.log(error);
          toast.error("Something wrong try again later");
        }
      });
  };
  return (
    <>
      {borrowed.length ? (
        <Container className="md:py-16">
          <h3 className="text-3xl md:text-6xl py-6 font-bold text-primary text-center">
            Borrowed Books here!
          </h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {borrowed?.map((borrow) => (
              <div
                key={borrow._id}
                className="flex justify-between text-gray-800 p-8 shadow-lg hover:shadow-md space-y-2
                  hover:from-transparent hover:to-transparent  hover:border-2 hover:text-accent-content hover:border-accent-content  font-medium bg-gradient-to-r hover:bg-transparent from-blue-300 to-purple-400 rounded-tr-2xl rounded-bl-2xl"
              >
                <img
                  src={borrow.image}
                  alt={borrow.book_name}
                  className=" w-36 h-56 object-cover rounded-lg"
                />
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold">{borrow.book_name}</h2>
                  <p className=" text-gray-500">Author: {borrow.author_name}</p>

                  <p className="text-base text-gray-500">
                    Category: {borrow.category}
                  </p>
                  <p className=" flex items-center text-base text-gray-500">
                    Rating:{" "}
                    <StarRating
                      rating={parseFloat(borrow.book_rating)}
                    ></StarRating>{" "}
                    ({borrow.book_rating})
                  </p>
                  <p className=" text-gray-500">
                    Borrowed Date: {borrow.borrowed_date}
                  </p>
                  <p className=" text-gray-500">
                    Return Date: {borrow.return_date}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleDelete(
                      borrow.objectId,
                      borrow._id,
                      borrow.book_quantity
                    )
                  }
                  className=" btn hover:from-transparent hover:to-transparent  hover:border-2 hover:text-accent-content hover:border-accent-content  font-medium bg-gradient-to-r hover:bg-transparent to-blue-300 from-purple-400 rounded-tr-lg rounded-bl-lg transition-transform hover:scale-105"
                >
                  Return
                </button>
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <div className="h-[90vh] flex justify-center items-center">
          <h2 className="text-3xl md:text-6xl py-6 font-bold text-primary-content text-center">
            No Book Borrowed
          </h2>
        </div>
      )}
    </>
  );
};

export default BorrowedBook;
