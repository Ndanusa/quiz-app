import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/config.js";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, CirclePasswordIcon } from "@hugeicons/core-free-icons";
function Login() {
  const emailRef = useRef(null);
  const email = emailRef.current;
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });
  const [fieldError, setFieldError] = useState({
    email: { error: false, message: "" },
    password: { error: false, message: "" },
  });
  const emailFormat =
    /^[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

  // Email and password input field

  const emailInput = () => {
    const email = emailRef.current.value;
    if (!emailFormat.test(email)) {
      setFieldError({
        ...fieldError,
        email: { message: "don't", error: true },
      });
    } else {
      setFieldError({ ...fieldError, email: { message: "", error: false } });
    }
  };

  async function handleLogin() {
    // if (!loginDetail.email || !loginDetail.password) return;
    // try {
    //   const res = await axios.post(
    //     `${BACKEND_URI}/api/v1/auth/sign-in`,
    //     loginDetail,
    //   );
    //   if (res.statusText === "OK") {
    //     localStorage.setItem("user", JSON.stringify(res.data.data));
    //     localStorage.setItem("token", res.data.token);
    //     window.location.href = "/home";
    //   }
    // } catch (error) {
    //   console.log(error?.response.data);
    // }
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div>
          <form
            action={() => event?.preventDefault()}
            className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">
                <p className="text-sm">Email</p>
                <div className="flex items-center relative">
                  <span className="absolute bottom-2 left-2">
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      color={`${fieldError.email.error ? "#ff0000" : "#14794f"}`}
                      size={19}
                      strokeWidth={1.7}
                    />
                  </span>
                  <input
                    onChange={emailInput}
                    name="email"
                    ref={emailRef}
                    placeholder="Enter your email"
                    className={`placeholder:text-xs text-sm pl-8 disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#ebf4f0] py-2 px-3 sqc-lg mt-2 w-90 ${
                      fieldError.email.error
                        ? "text-red-600 focus:outline-0 border-2 border-red-600 placeholder:text-red-500"
                        : "text-[#14794f] focus:outline-2 focus:outline-[#5ef7b7] border-0 placeholder:text-[#78ac96]"
                    }`}
                    type="email"
                  />
                </div>
              </label>
              <label htmlFor="password">
                <p className="text-sm">Password</p>
                <div className="flex items-center relative">
                  <span className="absolute bottom-2 left-2">
                    <HugeiconsIcon
                      icon={CirclePasswordIcon}
                      color={`${fieldError.password.error ? "#ff0000" : "#14794f"}`}
                      size={19}
                      strokeWidth={1.7}
                    />
                  </span>
                  <input
                    name="password"
                    placeholder="Enter your password"
                    className={`placeholder:text-xs text-sm pl-8 disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#ebf4f0] py-2 px-3 sqc-lg mt-2 w-90 ${
                      fieldError.password.error
                        ? "text-red-600 focus:outline-0 border-2 border-red-600 placeholder:text-red-500"
                        : "text-[#14794f] focus:outline-2 focus:outline-[#5ef7b7] border-0 placeholder:text-[#78ac96]"
                    }`}
                    type="password"
                    autoComplete="on"
                  />
                </div>
              </label>
            </div>
            <button
              onClick={handleLogin}
              className="bg-zinc-700 text-zinc-200 text-sm py-1.5 rounded-md">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
