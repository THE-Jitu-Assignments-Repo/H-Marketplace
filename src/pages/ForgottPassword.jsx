import React from "react";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
function ForgottPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value)
  };
  const onSubmit = async(e) => {
    e.preventDefault();
    try {
        const auth = getAuth()
        await sendPasswordResetEmail(auth, email)
        toast.success('Email sent succefully')
    } catch (error) {
        toast.error('Could not send reset email')
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            className="emailInput"
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" to='/sign-in'>Sign In</Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px'  />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgottPassword;
