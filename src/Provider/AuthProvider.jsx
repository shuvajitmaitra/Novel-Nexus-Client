import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { PropTypes } from "prop-types";
import { auth } from "../Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
// import axios from "axios";


export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
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
    onAuthStateChanged(auth, (currentUser) => {
      // const userEmail = currentUser?.email || user?.email;
      setUser(currentUser);
      // const loggedUser = {email: userEmail}
      // if(currentUser){
      //   // console.log(loggedUser);
      //   axios.post('http://localhost:5000/jwt', loggedUser, {withCredentials: true} )
      //   .then(res =>{
      //     console.log("from the auth provider in line of 52.......................",res.data);
      //   })
      // }else{
      //   axios.post("http://localhost:5000/logout", loggedUser, {withCredentials: true})
      //   .then(res =>{
      //     console.log(res.data);
      //   })
      // }
      setLoading(false);
    });
  }, [user]);

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
  children: PropTypes.node
}
export default AuthProvider;
