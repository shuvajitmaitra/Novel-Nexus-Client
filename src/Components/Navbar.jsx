import { NavLink } from "react-router-dom";
import Container from "./Container";

const Navbar = () => {
    const navLink = <>
    <li>
        <NavLink to={"/"}>Home</NavLink>
    </li>
    <li>
        <NavLink to={"/login"}>Sign In</NavLink>
    </li>
    </>
    return (
   
            <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300">
           <Container>
           <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div> 
            <div className="flex-1 px-2 mx-2">Navbar Title</div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                {navLink}
              </ul>
            </div>
           </Container>
          </div>
          {/* Page content here */}
          Content
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4  min-h-full bg-base-200">
            {/* Sidebar content here */}
            {navLink}
          </ul>
        </div>
      </div>

    );
};

export default Navbar;