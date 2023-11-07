import { Link, useNavigate } from "react-router-dom";
import Container from "../Components/Container";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const {userSignIn,googleSignIn} = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = (data) => {
    userSignIn(data.email, data.password)
    .then(()=>{
        toast.success("Sign In Successfully")
       reset()
        navigate(location.state ? location.state : "/");
    })
    .catch(()=>{
        toast.error("Invalid Email/Password")
    })
  };

  const handleGoogleLogin = ()=>{
    googleSignIn()
    .then(()=>{
      toast.success("Sign In Successfully")
      navigate(location.state ? location.state : "/");
    })
    .catch(()=>{
      toast.error("Invalid Email/Password")
  })
  }
  return (
    <Container className="py-10 ">
      <h3 className="text-3xl md:text-6xl py-6 font-bold text-primary text-center">
        Login Now!
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body pt-5 pb-10 rounded-md border bg-primary bg-opacity-20 md:w-1/2 mx-auto "
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            {...register("email")}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
          {...register("password")}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button  type="submit" className="btn btn-primary">Login</button>
        </div>
        <div className="font-medium">
          <h3>
            New here?{" "}
            <Link
              to={"/register"}
              className="text-primary"
            >
              Sign Up
            </Link>
          </h3>
        </div>
        <div className="flex items-center py-2">
          <span className="  flex-1 border-t-2 border-accent"></span>
          <span className="px-2 text-xl font-bold text-secondary">OR</span>
          <span className=" flex-1 border-t-2 border-accent"></span>
        </div>
        <div onClick={handleGoogleLogin} className="flex items-center btn text-white btn-primary">
          <FcGoogle className="text-4xl " /> Sign In with Google
        </div>
      </form>
    </Container>
  );
};

export default Login;
