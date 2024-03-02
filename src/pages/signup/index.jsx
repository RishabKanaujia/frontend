import React from "react";
import { useAuth } from "../../context/authContext";
import {
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
} from "../../firebase/auth";
import { useState } from "react";
import styles from "./style.module.css";
import Input from "../../components/input";
import {useNavigate, Link} from 'react-router-dom'

const SignUp = () => {
  const { userLoggedIn, currentUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showerror, setShowError] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = () => {
    if (userLoggedIn) {
      navigate("/user/" + currentUser.uid);
    }
  };
  isLoggedIn();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      try {
        await doCreateUserWithEmailAndPassword(username, password);
      } catch (error) {
        console.log(setShowError(true))
      }
     
      // doSendEmailVerification()
      console.log(username, password);
    }
    console.log(userLoggedIn.email);
    navigate('/createProfile')
  };

  const googleSignUp = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithGoogle();
    } catch (error) {
      console.log(setShowError(true))
    }
    
  };

  return (
    <div className={styles.loginContainer}>
      {userLoggedIn && userLoggedIn.displayname}
      <h2>SignUp</h2>
      <form className={styles.loginForm}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={setUsername}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />
         
        <button type="button" onClick={handleSignup}>
          SignUp
        </button>
        <h4>OR</h4>
        <button type="button" onClick={googleSignUp}>
          Sign Up with Google
        </button>
      </form>
      {showerror&&<label className={styles.errorText}>Error Signing In</label>}
      <div>
      <label>
      Already have an account?
      </label>
      <Link to="/login"> Login</Link>
      </div>
    </div>
  );
};
export default SignUp;
