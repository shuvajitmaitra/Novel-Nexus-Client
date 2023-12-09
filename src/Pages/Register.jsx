import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../Components/Container";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { auth } from "../Firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import useAuth from "../Hook/useAuth";
import { useState } from "react";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { createUser, logOut, googleSignIn } = useAuth();
  const onSubmit = (data) => {
    const regExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&`#^(){}.])[0-9a-zA-Z@$!%*?&`#^(){}.]{6,}$/;

    if (!regExp.test(data.password)) {
      return setError("Invalid password");
    }
    setError("");
    createUser(data?.email, data.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: data.displayName,
          photoURL: data.photoURL,
        })
          .then((res) => {
          if(res.user.displayName){
            logOut(auth)
            .then(() => {
              navigate("/login");
              toast.success("User Created Successfully");
            })
            .catch((error) => {
              toast.error(error.message);
            });
          }
          else{
            console.log("profile cannot be updated");
          }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        toast.success("Sign In Successfully");
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <Container className="py-10">
      <h3 className="text-3xl md:text-6xl py-6 font-bold text-primary text-center">
        Register Now!
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body pt-5 pb-10 rounded-md border bg-primary bg-opacity-20  md:w-1/2 mx-auto"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            name="displayName"
            placeholder="Full Name"
            {...register("displayName")}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email")}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input
            type="text"
            name="photoURL"
            placeholder="ImageURL"
            {...register("photoURL")}
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
            placeholder="Password"
            {...register("password")}
            className="input input-bordered"
            required
          />
        </div>
        <p className="text-red-400">{error}</p>
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
        </div>
        <div className="font-medium">
          <h3>
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-primary"
            >
              Sign In
            </Link>
          </h3>
        </div>
        <div className="flex items-center py-2">
          <div className="  flex-1 border-t-2 border-accent"></div>
          <span className="px-2 text-xl font-bold text-secondary">OR</span>
          <span className=" flex-1 border-t-2 border-accent"></span>
        </div>
        <div
          onClick={handleGoogleLogin}
          className="flex items-center btn text-white btn-primary"
        >
          <FcGoogle className="text-4xl " /> Sign In with Google
        </div>
      </form>
    </Container>
  );
};

export default Register;
