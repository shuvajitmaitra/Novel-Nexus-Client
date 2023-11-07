import { NavLink } from "react-router-dom";
import Container from "./Container";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FcLibrary } from "react-icons/fc";
import { FaRegUserCircle } from "react-icons/fa";
import { auth } from "../Firebase/firebase.config";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

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
  const navLink = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "btn btn-primary btn-sm px-4 lg:px-auto " : "btn btn-accent btn-sm px-4 lg:px-auto"
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
                isActive ? "btn btn-primary btn-sm" : "btn btn-accent btn-sm"
              }
            >
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/all-book"}
              className={({ isActive }) =>
                isActive ? "btn btn-primary btn-sm" : "btn btn-accent btn-sm"
              }
            >
              All Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/borrowed-book"}
              className={({ isActive }) =>
                isActive ? "btn btn-primary btn-sm" : "btn btn-accent btn-sm"
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
                className="btn btn-square btn-accent"
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
            <div className=" hidden  lg:flex items-center gap-20">
              <ul className="navbar-center menu-horizontal gap-3">
                {/* Navbar menu content here */}
                {navLink}
              </ul>
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
        <ul className=" p-4 w-1/2 md:w-1/3 flex flex-col items-center   min-h-full bg-base-200 ">
          {user ? (
            <>
              <div className="">{userProfile}</div>
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
          <li className="w-full mx-auto border border-black block text-center">{navLink}</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
