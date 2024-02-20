import React, { useState } from "react";
import Login from "../../Components/Login";
import Index from "../../Components/Register";

import "./index.css";

const AuthPage = ({ setIsLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className={"authPage"}>
      <div className={"authSec"}>
        <div>
          {showLogin ? (
            <Login setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Index setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>

        <p className={"toggle"}>
          {showLogin ? (
            <span>
              New to MyApp?{" "}
              <span
                onClick={() => {
                  setShowLogin(!showLogin);
                }}
                className={"toggleBtn"}
              >
                Sign Up
              </span>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setShowLogin(!showLogin);
                }}
                className={"toggleBtn"}
              >
                Login
              </span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
