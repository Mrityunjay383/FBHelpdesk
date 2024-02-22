import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { Auth } from "../../service";

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Password Show Toggle
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const loginSubmit = async () => {
    if (formData.email === "" || formData.password === "") {
      return toast.error("All fields must be Filled");
    }

    //calling the login endpoint
    const res = await Auth.login(formData);

    if (res.status === 200) {
      toast.success("Login successful");
      //storing the jwt token in the browser cookie
      Cookies.set("token", res.data.token);
      setIsLoggedIn(true);
    } else {
      console.log(`#202324717457861 Error`, res);
      toast.error(res.data.errorMessage);
    }
  };

  return (
    <div>
      <h3>Login to your account</h3>
      <div className="mt-5 mb-4">
        <div className="mb-3">
          <label className="form-label">
            Email <span className={"reqStar"}>*</span>
          </label>
          <input
            type="email"
            className="form-control"
            placeholder={"Enter your email address"}
            onChange={(e) =>
              setFormData((curr) => {
                return { ...curr, email: e.target.value };
              })
            }
          />
        </div>

        <div className="">
          <label className="form-label">
            Password <span className={"reqStar"}>*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder={"Enter your password"}
            onChange={(e) =>
              setFormData((curr) => {
                return { ...curr, password: e.target.value };
              })
            }
          />
          {!showPassword ? (
            <FaEye className={"PassEye"} onClick={handleShowPasswordToggle} />
          ) : (
            <FaEyeSlash
              className={"PassEye"}
              onClick={handleShowPasswordToggle}
            />
          )}
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label">Remember me</label>
        </div>

        <button
          className="btn btn-primary w-100 mt-3 subBtn"
          onClick={loginSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
