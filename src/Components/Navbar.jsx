import { NavLink } from "react-router-dom";
import Container from "./Container";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import {FcLibrary} from "react-icons/fc"

const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.displayName);

  const userProfile = (
    <div className="  flex flex-col lg:flex-row items-center justify-center gap-3 pr-2 lg:bg-primary lg:bg-opacity-50 rounded-full">
      <img
        src={user?.photoURL}
        className="w-12 h-12 object-cover border-4 border-white rounded-full"
      />
      <h2 className="text-lg lg:text-white font-medium">{user?.displayName}</h2>
    </div>
  );
  const navLink = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/login"}>Sign In</NavLink>
      </li>
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
        <div className="w-full navbar bg-accent bg-opacity-20">
          <Container>
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
            <div className="navbar-start  px-2 mx-2 flex items-center gap-2 text-lg md:text-2xl font-medium text-primary text-opacity-50"><FcLibrary className=" text-xl lg:text-3xl"/>Novel Nexus</div>
            <div className=" hidden lg:flex items-center gap-20">
              <ul className="navbar-center  menu menu-horizontal">
                {/* Navbar menu content here */}
                {navLink}
              </ul>
            </div>
              <div className="navbar-end hidden lg:flex ">{userProfile}</div>
          </Container>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-1/2 md:w-1/3  min-h-full bg-base-200">
          <div className="">{userProfile}</div>
          {/* Sidebar content here */}
          {navLink}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
