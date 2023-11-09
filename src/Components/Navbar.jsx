import { NavLink } from "react-router-dom";
import Container from "./Container";
import { useEffect, useState } from "react";
import { FcLibrary } from "react-icons/fc";
import { FaRegUserCircle } from "react-icons/fa";
import { auth } from "../Firebase/firebase.config";
import toast from "react-hot-toast";
import useAuth from "../Hook/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const userProfile = (
    <div className="  flex flex-col lg:flex-row items-center justify-center gap-3 pr-3 lg:bg-primary lg:bg-opacity-50 rounded-full">
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          className="w-12 h-12 object-cover border-4 border-white rounded-full"
        />
      ) : (
        <FaRegUserCircle className="w-12 h-12 object-cover border-4 text-zinc-500 border-white rounded-full bg-zinc-200" />
      )}
      <h2 className=" lg:text-white font-medium">{user?.displayName}</h2>
    </div>
  );

  const handleSignOut = () => {
    logOut(auth)
      .then(() => {
        toast.success("User Sign Out!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "corporate"
  );

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("business");
    } else {
      setTheme("corporate");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const navLink = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "btn  btn-primary btn-sm px-4 lg:px-auto "
              : "btn  btn-accent btn-sm px-4 lg:px-auto"
          }
        >
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to={"/add-book"}
              className={({ isActive }) =>
                isActive ? "btn  btn-primary btn-sm" : "btn  btn-accent btn-sm"
              }
            >
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/all-book"}
              className={({ isActive }) =>
                isActive ? "btn  btn-primary btn-sm" : "btn  btn-accent btn-sm"
              }
            >
              All Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/borrowed-book"}
              className={({ isActive }) =>
                isActive ? "btn  btn-primary btn-sm" : "btn  btn-accent btn-sm"
              }
            >
              Borrowed Book
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="bg-accent bg-opacity-20">
          <Container className="flex justify-start lg:justify-between items-center py-3">
            {/* ------------------------------------------------ */}
            {/* For Mobile screen */}
            {/* ------------------------------------------------ */}
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            {/* ------------------------------------------------ */}
            {/* For Logo */}
            {/* ------------------------------------------------ */}
            <div className=" px-2 mx-2 flex items-center gap-2 text-lg md:text-2xl font-medium text-primary text-opacity-50">
              <FcLibrary className=" text-xl lg:text-3xl" />
              Novel Nexus
            </div>

            {/* ------------------------------------------------ */}
            {/* For Full screen */}
            {/* ------------------------------------------------ */}
            <div className=" hidden  lg:flex items-center gap-3 justify-center ">
              <ul className="navbar-center menu-horizontal gap-3">
                {/* Navbar menu content here */}
                {navLink}
              </ul>
              <label className="swap swap-rotate">
                <input
                  type="checkbox"
                  onChange={handleToggle}
                  checked={theme === "corporate" ? false : true}
                />

                <svg
                  className="swap-on fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-off fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
            <div className=" hidden lg:flex ">
              <div className=" drawer-end">
                <input
                  id="my-drawer-4"
                  type="checkbox"
                  className="drawer-toggle w-fit"
                />
                <div className="drawer-content ">
                  {/* Page content here */}
                  <label
                    htmlFor="my-drawer-4"
                    className="drawer-button"
                  >
                    {user ? (
                      <span>{userProfile}</span>
                    ) : (
                      <ul className=" w-ful my-3 flex gap-2 text-white">
                        {/* Navbar menu content here */}
                        <li className="btn bg-primary btn-sm w-ful my-3  text-white">
                          <NavLink to={"/login"}>Sign In</NavLink>
                        </li>
                        <li className="btn bg-accent btn-sm w-ful my-3  text-white">
                          <NavLink to={"/register"}>Sign Up</NavLink>
                        </li>
                      </ul>
                    )}
                  </label>
                </div>
                {/* ------------------------------------------------ */}
                {/* For Full screen drawer slider.........*/}
                {/* ------------------------------------------------ */}
                {user && (
                  <div className="drawer-side z-10">
                    <label
                      htmlFor="my-drawer-4"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                      <button
                        onClick={handleSignOut}
                        aria-label="close sidebar"
                        className="bg-error py-2  hover:bg-opacity-50 text-white font-medium text-center"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
                {/* ------------------------------------------------ */}
                {/* For Full screen drawer slider end */}
                {/* ------------------------------------------------ */}
              </div>
            </div>
          </Container>
        </div>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className=" p-4 w-1/2 md:w-1/3 flex flex-col items-center   min-h-full bg-base-200 ">
          {user ? (
            <>
              <div className="text-center">{userProfile}</div>
              <button
                onClick={handleSignOut}
                className="btn btn-sm bg-error w-full my-3 hover:bg-opacity-50 text-white font-medium text-center"
              >
                Sign Out
              </button>
            </>
          ) : (
            <ul className=" w-ful flex flex-col my-3 gap-3 text-white">
              <li className="btn bg-primary btn-sm w-ful  text-white">
                <NavLink to={"/login"}>Sign In</NavLink>
              </li>
              <li className="btn bg-accent btn-sm w-ful  text-white">
                <NavLink to={"/register"}>Sign Up</NavLink>
              </li>
            </ul>
          )}
          <span className="w-full mx-auto space-y-2 list-none text-center">
            {navLink}
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                onChange={handleToggle}
                checked={theme === "corporate" ? false : true}
              />

              {/* sun icon */}
              <svg
                className="swap-on fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
