import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { PropTypes } from "prop-types";
import { auth } from "../Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";

//

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // create User.........
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in user...........
  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google sign in ......
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Log out user................
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // onAuthStateChanged.......
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      setUser(currentUser);
      const loggedUser = { email: userEmail };
      if (currentUser) {
        // console.log(loggedUser);
        axiosSecure
          .post("/jwt", loggedUser)
          .then((res) => {
            console.log(res.data);
          });
      } else {
        axiosSecure
          .post("/logout", loggedUser)
          .then((res) => {
            console.log(res.data);
          });
      }
      setLoading(false);

      return () => {
        return unSubscribe();
      };
    });
  }, [user, axiosSecure]);

  const authInfo = {
    user,
    loading,
    createUser,
    userSignIn,
    googleSignIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
