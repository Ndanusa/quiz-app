import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/config.ts";
import { HugeiconsIcon } from "@hugeicons/react";
import studyImage from "../assets/wise.svg";
import logoImg from "../assets/logo text.svg";
import googleImg from "../assets/google.svg";
import {
  Mail01Icon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffIcon,
  GoogleIcon,
  TwitterIcon,
  X,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [passwordState, setPasswordState] = useState("password");
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
    setLoginDetail({ ...loginDetail, email });

    if (!email)
      return setFieldError({
        ...fieldError,
        email: {
          message: "Field Cannot Be Empty",
          error: true,
        },
      });

    if (!emailFormat.test(email)) {
      return setFieldError({
        ...fieldError,
        email: { message: "Enter a Valid Email Address", error: true },
      });
    }
    setFieldError({ ...fieldError, email: { message: "", error: false } });
  };

  const passwordInput = (e) => {
    setLoginDetail({ ...loginDetail, password: e.target.value });
    if (!e.target.value)
      return setFieldError({
        ...fieldError,
        password: {
          message: "Field Cannot Be Empty",
          error: true,
        },
      });
    if (e.target.value.length < 8) {
      return setFieldError({
        ...fieldError,
        password: {
          message: "Password Should Be 8 Characters or More",
          error: true,
        },
      });
    }
    setFieldError({ ...fieldError, password: { message: "", error: false } });
  };

  async function handleLogin() {
    if (!loginDetail.email && !loginDetail.password)
      return setFieldError({
        email: { message: "Field Cannot Be Empty", error: true },
        password: { message: "Field Cannot Be Empty", error: true },
      });

    if (!loginDetail.email)
      return setFieldError({
        ...fieldError,
        email: { error: true, message: "Enter Email" },
      });

    if (!loginDetail.password) {
      return setFieldError({
        ...fieldError,
        password: { error: true, message: "Enter Password" },
      });
    }
    if (fieldError.email.error || fieldError.password.error) return;
    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URI}/api/v1/auth/sign-in`,
        loginDetail,
      );
      console.log(res);

      if (res.statusText === "OK") {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("token", res.data.token);
        window.location.href = "/home";
      }
    } catch (error) {
      const err = error.response.data;
      const message = err.message;
      if (err.type === "email") {
        return setFieldError({
          ...fieldError,
          email: { error: true, message },
        });
      }
      if (err.type === "password") {
        return setFieldError({
          ...fieldError,
          password: { error: true, message },
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={"flex items-center h-screen"}>
        <div className="flex-1 bg-[#f1f1f1] h-full p-20">
          <div className="flex flex-col gap-4 items-center justify-center h-full ">
            <div className="w-11/20  pb-20">
              <div className="py-20">
                <img src={logoImg} alt="" className="w-45" />
              </div>
              <div className="flex items-center justify-between">
                <div className="my-2">
                  <h1 className="font-medium text-xl text-zinc-700">
                    Login to your account
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Please enter your details
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <div className="w-full">
                  <p className={"text-sm"}>Email</p>
                  <div className="flex items-center relative">
                    <input
                      onChange={emailInput}
                      name="email"
                      ref={emailRef}
                      placeholder="Enter your email"
                      className={`placeholder:text-sm border-2 border-zinc-200 text-sm disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-white py-2 px-3 sqc-lg rounded-md w-full mt-2 ${
                        fieldError.email.error
                          ? "text-red-600 focus:outline-0 border-2 border-red-600 placeholder:text-red-500"
                          : "text-[#14794f] focus:outline-2 focus:outline-[#5ef7b7] border-0 placeholder:text-[#78ac96]"
                      }`}
                      type="email"
                    />
                  </div>
                  {fieldError.email.error && (
                    <div className="text-xs text-red-500 p-1">
                      {fieldError.email.message}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <p className="text-sm">Password</p>
                  <div className="flex items-center relative">
                    <input
                      onChange={passwordInput}
                      name="password"
                      placeholder="Enter your password"
                      className={`placeholder:text-sm ring-2 ring-inset ring-zinc-200 text-sm px-3 pr-11 disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-white py-2 sqc-lg rounded-md mt-2 w-full ${
                        fieldError.password.error
                          ? "text-red-600 focus:outline-0 border-2 border-red-600 placeholder:text-red-500"
                          : "text-[#14794f] focus:outline-2 focus:outline-[#5ef7b7] border-0 placeholder:text-[#acacac]"
                      }`}
                      type={passwordState}
                      autoComplete="on"
                    />
                    <HugeiconsIcon
                      className="absolute right-3 bottom-2 cursor-pointer"
                      onClick={() =>
                        passwordState === "password"
                          ? setPasswordState("text")
                          : setPasswordState("password")
                      }
                      icon={
                        passwordState === "password" ? ViewIcon : ViewOffIcon
                      }
                      size={19}
                      strokeWidth={1.7}
                    />
                  </div>

                  {fieldError.password.error && (
                    <div className="text-xs text-red-500 p-1">
                      {fieldError.password.message}
                    </div>
                  )}
                </div>
              </div>

              <Link className="text-sm text-gray-500 block mt-2" to={`/reset`}>
                Forgot password?
              </Link>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="bg-[#77fecf] text-zinc-600 font-medium py-1.5 sqc-lg rounded-md disabled:bg-zinc-300 disabled:text-zinc-800 w-full mt-5 border-2 border-zinc-300">
                Login
              </button>
              <div className="flex items-center justify-between py-5">
                <div className="border w-2/5 border-zinc-300 rounded-full"></div>
                <div className="font-bold text-sm text-zinc-500">OR</div>
                <div className="border w-2/5 border-zinc-300 rounded-full"></div>
              </div>
              <div className="flex items-center justify-center h-20 gap-3">
                <div className="border-zinc-200 border-2 rounded-lg sqc-md p-2 w-1/2 flex items-center justify-center bg-zinc-100">
                  <HugeiconsIcon icon={NewTwitterIcon} size={30} />
                </div>
                <div className="border-zinc-200 border-2 rounded-lg sqc-md p-2 w-1/2 flex items-center justify-center bg-zinc-100">
                  <img src={googleImg} alt="" className="w-7" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-[#31c59b] p-10 flex justify-between relative flex-1 px-10 h-full flex-col">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#e9fef3] to-[#90ffc6]"></h1>
          </div>
          <img src={studyImage} alt="" className="w-200 self-start" />
        </div>
      </div>
    </>
  );
}

export default Login;
