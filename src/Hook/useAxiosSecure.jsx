import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      console.log("Error trucked", error.response);
      if (error.response.status == 404 || error.response.status == 401) {
        logOut();
        navigate("/login");
      }
    }
  );
  return axiosSecure;
};