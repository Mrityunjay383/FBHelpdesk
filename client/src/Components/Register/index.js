import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Auth } from "../../service";

const Register = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //Password Show Toggle
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const registerSubmit = async () => {
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      return toast.error("All fields must be Filled");
    }

    if (!validateEmail(formData.email)) {
      return toast.error("Please enter a valid email");
    }

    const res = await Auth.register(formData);

    if (res.status === 201) {
      toast.success("Account created successfully");
      setIsLoggedIn(true);
    } else {
      console.log(`#202324717457861 Error`, res);
      toast.error(res.data.errorMessage);
    }
  };

  return (
    <div>
      <h3>Create Account</h3>
      <div className="mt-5 mb-4">
        <div className="mb-3">
          <label className="form-label">
            Name <span className={"reqStar"}>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={"Enter your name"}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, name: e.target.value };
              });
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Email <span className={"reqStar"}>*</span>
          </label>
          <input
            type="email"
            className="form-control"
            placeholder={"Enter your email address"}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, email: e.target.value };
              });
            }}
          />
        </div>

        <div className="">
          <label className="form-label">
            Password <span className={"reqStar"}>*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder={"Enter a strong password"}
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
          onClick={registerSubmit}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
