// import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = (navigate) => {
  // const navigate = useNavigate();
  const user = useContext(AuthContext)
  const logOut = user?.logOut ||{}
  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      console.log("Error trucked", error.response);
      if (error.response.status == 404 || error.response.status == 401) {
        logOut()
        .then(()=>{
          
          navigate("/login");
        })
        .catch(error =>{
          console.log(error.message);
        })
      }
    }
  );
  return axiosSecure;
};
export default useAxiosSecure;
