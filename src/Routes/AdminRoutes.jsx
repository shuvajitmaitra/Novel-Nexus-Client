import PropTypes from "prop-types";
import axios from "axios";
import useAuth from "../Hook/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const userEmail = user?.email;
    console.log(userEmail);
    const [admin, setAdmin] = useState([]);        

useEffect(() => {
    axios.get(`https://assignment-11-novel-nexus-server.vercel.app/admin?email=${userEmail}`,{
    withCredentials: true,
  })
  .then(res=>{
    console.log(res?.data);
      setAdmin(res?.data)
    return 
  })
}, [userEmail])


  if (loading) {
    return (
      <span className="h-screen flex justify-center items-center">
        <progress className="progress w-56"></progress>
      </span>
    );
  }

  if (admin!=='') {
    return children;
  }
  

  return (
   <div className="h-[80vh] flex justify-center flex-col gap-3 items-center">
    <h3 className="text-3xl md:text-6xl font-bold text-primary text-center">
        Only Librarian can access! 
      </h3>
      <Link to="/login"><button className=" btn hover:from-transparent hover:to-transparent  hover:border-2 hover:text-accent-content hover:border-accent-content  font-medium bg-gradient-to-r hover:bg-transparent to-blue-300 from-purple-400 rounded-tr-lg rounded-bl-lg transition-transform hover:scale-105">Login</button></Link>
   </div>
  );
};
AdminRoutes.propTypes = {
  children: PropTypes.node,
};
export default AdminRoutes;
