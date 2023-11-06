import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";
import Container from "./Container";
import ReactModal from "react-modal";
import { AuthContext } from "../Provider/AuthProvider";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";




{
  /* ------------------------------ */
}
{
  /* Modal */
}
{
  /* ------------------------------ */
}
// ref={(_subtitle) => (subtitle = _subtitle)}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
{
  /* ------------------------------ */
}
{
  /* Modal */
}
{
  /* ------------------------------ */
}

const BookDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const {
      book_name,
      image,
      author_name,
      category,
      book_rating,
      short_description,
      book_quantity,
    } = book;
    //   console.log(id);
    // const [quantity, setQuantity] = useState(book_quantity)

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`).then((res) => {
      setBook(res.data);
    });
  }, [id]);

  {
    /* ------------------------------ */
  }
  {
    /* Modal */
  }
  {
    /* ------------------------------ */
  }
  //   let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  {
    /* ------------------------------ */
  }
  {
    /* Modal */
  }
  {
    /* ------------------------------ */
  }

  const handleBorrow = (e) => {
    e.preventDefault();
   
    if (book_quantity) {
      const newQuantity = book_quantity - 1;

      axios
      .post("http://localhost:5000/borrowed", {
        email: user.email,
        book_name,
        image,
        author_name,
        category,
        book_rating,
        short_description,
        book_quantity,
      })
      .then((res) => {
        if(!res.data.insertedId){
            toast.error("You already Borrowed");
        }
        if (res.data.insertedId) {
        axios
        .put(`http://localhost:5000/books/${id}`, {
          book_quantity: newQuantity,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.modifiedCount > 0) {
            toast.success("Successfully Borrowed");
            closeModal();
                axios.get(`http://localhost:5000/books/${id}`).then((res) => {
                  setBook(res.data);
                });

          }
        })
        .catch((error) => {
            toast.error(error);
        });
        }
      })
      .catch((error) => {
        toast.error(error);
        
      });

      
    }
  };

  return (
    <Container className="flex flex-col lg:flex-row gap-8 md:py-16">
      <div className="border h-screen flex-1 bg-primary-content rounded p-14 transition-transform hover:scale-105">
        <img
          src={image}
          className=" h-full  object-cover mx-auto  rounded-lg "
        />
      </div>
      <div className="border  flex flex-col flex-1 p-8 bg-accent bg-opacity-20 space-y-4 rounded">
        <h1 className="text-secondary text-3xl font-bold text-center underline">
          Book Details
        </h1>
        <div>
          <h2 className="text-accent font-medium text-lg underline">
            Name of the Book:{" "}
          </h2>
          <p className="text-secondary no-underline">{book_name}</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-4">
          <h2 className="text-accent font-medium text-lg underline">
            Author Name:
          </h2>
          <p className="text-secondary no-underline">{author_name}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex  flex-col lg:flex-row lg:gap-4 items-start lg:items-center">
            <h2 className="text-accent font-medium text-lg underline">
              Book Quantity:
            </h2>
            <span className="text-secondary no-underline">{book_quantity}</span>
          </div>
          <div className="flex flex-col lg:flex-row  lg:gap-4 items-start lg:items-center">
            <h2 className="text-accent font-medium text-lg underline">
              Book Category:{" "}
            </h2>
            <span className="text-secondary no-underline">{category}</span>
          </div>
        </div>

        <div>
          <h2 className="text-accent font-medium text-lg underline">
            Book Rating:{" "}
          </h2>
          <p className=" flex items-center text-base gap-3">
            {" "}
            <StarRating rating={book_rating}></StarRating> ({book_rating})
          </p>
        </div>
        <div>
          <h2 className="text-accent font-medium text-lg underline">
            Sort Description:{" "}
          </h2>
          <p className="text-secondary no-underline">{short_description}</p>
        </div>
        <div className="flex-grow"></div>
        <div className=" flex justify-center gap-3">
          <button
            onClick={openModal}
            className="btn btn-accent hover:bg-green-400 text-white rounded py-2 px-4 focus:outline-none transition-transform hover:scale-105"
          >
            Borrow
          </button>
          {/* ------------------------------ */}
          {/* Modal */}
          {/* ------------------------------ */}
          <div className="relative ">
            <ReactModal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              id="root"
              contentLabel="Example Modal"
              className="card-body pt-5 pb-10 h-screen lg:h-[80vh] rounded-md border bg-primary-content lg:w-1/2 mx-auto absolute  "
            >
              <h2 className="text-3xl  font-bold text-primary text-center lg:py-5 relative">
                Fill Up the Form!
              </h2>
              <MdClose
                onClick={closeModal}
                className="text-3xl lg:text-4xl absolute top-0 right-0 lg:-top-5 lg:-right-4 rounded-full bg-accent-focus text-error  "
              />
              <form
                onSubmit={handleBorrow}
                className="w-full rounded-md  mx-auto "
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.displayName}
                    placeholder="Name"
                    // {...register("email")}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    defaultValue={user.email}
                    //   {...register("password")}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Return Date</span>
                  </label>
                  <input
                    type="date"
                    name="return_date"
                    placeholder="Return date"
                    //   {...register("password")}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Borrow
                  </button>
                </div>
              </form>
            </ReactModal>
          </div>
          {/* ------------------------------ */}
          {/* Modal */}
          {/* ------------------------------ */}
          <button className="btn btn-error hover:bg-blue-600 text-white rounded py-2 px-4 focus:outline-none transition-transform hover:scale-105">
            Read More
          </button>
        </div>
      </div>
    </Container>
  );
};

export default BookDetails;
