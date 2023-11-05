import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import AddBook from "../Components/AddBook";
import AllBook from "../Components/AllBook";
import BorrowedBook from "../Components/BorrowedBook";

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
        element: <AddBook></AddBook>,
      },
      {
        path: "/all-book",
        element: <AllBook></AllBook>,
      },
      {
        path: "/borrowed-book",
        element: <BorrowedBook></BorrowedBook>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default Routes;
