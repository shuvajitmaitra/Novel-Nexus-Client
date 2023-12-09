import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import AddBook from "../Components/AddBook";
import AllBook from "../Components/AllBook";
import BorrowedBook from "../Components/BorrowedBook";
import PrivateRoute from "../Components/PrivateRoute";
import CategoriseBooks from "../Components/CategoriseBooks";
import BookDetails from "../Components/BookDetails";
import BookStory from "../Components/BookStory";
import UpdateForm from "../Components/UpdateForm";
// import ErrorPage from "../Pages/ErrorPage";
import PostReview from "../Components/PostReview";
import BookRequest from "../Components/BookRequest";
import AdminRoutes from "./AdminRoutes";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-book",
        element: <AdminRoutes><AddBook></AddBook></AdminRoutes>,
      },
      {
        path: "/all-book",
        element:<AdminRoutes><AllBook></AllBook></AdminRoutes> ,
      },
      {
        path: "/borrowed-book",
        element: <PrivateRoute><BorrowedBook></BorrowedBook></PrivateRoute>,
      },
      {
        path: "/",
        element: <PrivateRoute><BookRequest></BookRequest></PrivateRoute>,
      },
      {
        path: "/",
        element: <PrivateRoute><PostReview></PostReview></PrivateRoute>,
      },
      {
        path: "/categorized-book/:book_category",
        // element: <PrivateRoute><CategoriseBooks></CategoriseBooks></PrivateRoute>,
        element: <CategoriseBooks></CategoriseBooks>,
      },
      {
        path: "/bookDetails/:id",
        element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute>,
      },
      
      {
        path: "/update-book/:id",
        element: <PrivateRoute><UpdateForm></UpdateForm></PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/book-story/:id",
    element: <PrivateRoute><BookStory></BookStory></PrivateRoute>,
  },
]);

export default Routes;
