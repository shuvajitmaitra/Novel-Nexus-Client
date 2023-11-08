import { useForm } from "react-hook-form";
import Container from "./Container";
import axios from "axios";
import toast from "react-hot-toast";


const AddBook = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit =(data)=>{
const {
    bookName,
    bookImage,
    bookQuantity,
    authorName,
    category,
    sortDescription,
    bookRating,
    bookSummary}= data;


   
    axios.post("http://localhost:5000/books", {
        book_name:bookName,
        image:bookImage,
        book_quantity:bookQuantity,
        author_name:authorName,
        category:category,
        book_rating:bookRating,
        short_description: sortDescription,
        book_summary: bookSummary,
    })
    .then(res=>{
       
        if(res.data.insertedId){
           return toast.success("Book Added Successfully")
        }
    })
    .then(error=>{
        toast.error(error)
    })
}



    return (
        <Container >
           <h1 className="text-3xl md:text-6xl py-6 font-bold text-primary text-center">Add Books Here!</h1>
         <form onSubmit={handleSubmit(onSubmit)} className="card-body lg:w-3/4 mx-auto">
{/* ------------------------------------------------ */}
{/* First row*/}
{/* ------------------------------------------------ */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Book Name</span>
          </label>
          <input type="text" {...register("bookName")} name="bookName" placeholder="Book Name" className="input input-bordered" required />
        </div>

        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Book Image</span>
          </label>
          <input type="text" {...register("bookImage")} name="bookImage" placeholder="Book Image" className="input input-bordered" required />
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
          <input type="number" {...register("bookQuantity")} min="1" name="bookQuantity" placeholder="Book Quantity" className="input input-bordered" required />
        </div>
      <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Author Name</span>
          </label>
          <input type="text" {...register("authorName")} name="authorName"  placeholder="Author Name" className="input input-bordered" required />
        </div>
      </div>
{/* ------------------------------------------------ */}
{/* First row*/}
{/* ------------------------------------------------ */}
<div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Book Category</span>
          </label>
         <select 
           type="text"
           {...register("category")} name="category"
           className="input input-bordered rounded"
           required>
            <option >Choose a Category</option>
            <option value="History"  >History</option>
            <option value="Drama" >Drama</option>
            <option value="Novel" >Novel</option>
            <option value="Thriller" >Thriller</option>
         </select>
        </div>
      <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Sort Description</span>
          </label>
          <input type="text" {...register("sortDescription")} name="sortDescription" placeholder="Sort Description" className="input input-bordered" required />
        </div>
      </div>

      {/* ------------------------------------------------ */}
{/* First row*/}
{/* ------------------------------------------------ */}


   <div className="flex flex-col lg:flex-row gap-6">
   <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Book Rating (Number)</span>
          </label>
          <input type="number" {...register("bookRating")} name="bookRating" step="0.01" min='1' max="5"  placeholder="Book Summary" className="input input-bordered" required />
        </div>
      <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Book Summary</span>
          </label>
          <input type="text" {...register("bookSummary")} name="bookSummary"  placeholder="Book Summary" className="input input-bordered" required />
        </div>
   </div>



{/* ------------------------------------------------ */}
{/*Submit Button*/}
{/* ------------------------------------------------ */}
     <div className="form-control flex-1 mt-6">
          <button type="submit" className="btn btn-primary">Add Book</button>
        </div>
      </form>
        </Container>
    );
    };

export default AddBook;