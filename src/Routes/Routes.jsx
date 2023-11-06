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

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-book",
        element: <PrivateRoute><AddBook></AddBook></PrivateRoute>,
      },
      {
        path: "/all-book",
        element:<PrivateRoute><AllBook></AllBook></PrivateRoute> ,
      },
      {
        path: "/borrowed-book",
        element: <PrivateRoute><BorrowedBook></BorrowedBook></PrivateRoute>,
      },
      {
        path: "/categorized-book/:book_category",
        element: <PrivateRoute><CategoriseBooks></CategoriseBooks></PrivateRoute>,
      },
      {
        path: "/bookDetails/:id",
        element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute>,
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
  
]);

export default Routes;
