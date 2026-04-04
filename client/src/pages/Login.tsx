import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URI, getGreeting } from "../config/config.ts";
import { HugeiconsIcon } from "@hugeicons/react";
import studyImg from "../assets/study.jpg";
import logoImg from "../assets/logo text.svg";
import googleImg from "../assets/google.svg";
import xImage from "../assets/x.svg";
import {
  Mail01Icon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffIcon,
  GoogleIcon,
  TwitterIcon,
  X,
  NewTwitterIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
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
    setIsTypingEmail(true);
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
    setIsTypingPassword(true);
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
    if (!loginDetail.email && !loginDetail.password) {
      setIsTypingEmail(true);
      setIsTypingPassword(true);

      return setFieldError({
        email: { message: "", error: true },
        password: { message: "", error: true },
      });
    }
    if (!loginDetail.email) {
      setIsTypingEmail(true);
      return setFieldError({
        ...fieldError,
        email: { error: true, message: "Enter Email" },
      });
    }
    if (!loginDetail.password) {
      setIsTypingPassword(true);
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
        window.location.href = "dashboard";
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
        <div className="flex-1 h-full p-5 auth">
          <div className="flex items-center justify-between sticky top-0">
            <img src={logoImg} alt="" className="w-25" />
            <Link
              to={`/signup`}
              className="h-10 bg-[#1b2820] text-[#f2fff7] px-7 sqc-lg flex items-center justify-center"
            >
              Signup
            </Link>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center h-full ">
            <div className="lg:w-11/20 pb-30">
              <div>
                <div className="text-center *:py-1 py-10">
                  <h1 className="font-semibold text-3xl text-zinc-700">
                    {getGreeting()}!
                  </h1>
                  <p className="text-gray-600 text-sm">
                    To login your account please enter your email and password
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <div className="w-full">
                  <div className="flex items-center relative">
                    <input
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          handleLogin();
                        }
                      }}
                      onChange={emailInput}
                      name="email"
                      ref={emailRef}
                      placeholder="Enter your email"
                      className={`placeholder:text-sm h-12 text-sm disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#f0f3f1] py-2 px-3 sqc-lg rounded-md w-full mt-2 text-[#14794f] focus:outline-2 focus:outline-[#5ef7b7] border-0 placeholder:text-[#818181] `}
                      type="email"
                    />
                    {isTypingEmail && (
                      <HugeiconsIcon
                        icon={fieldError.email.error ? X : Tick02Icon}
                        strokeWidth={3}
                        size={20}
                        className={`absolute right-3 bottom-3 $  text-white rounded-full p-1 ${!fieldError.email.error ? "bg-[#47c276]" : "bg-[#f70d0d]"}`}
                      />
                    )}
                  </div>
                  {fieldError.email.message && (
                    <div className="text-xs text-red-500 p-1">
                      {fieldError.email.message}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <div className="flex items-center relative">
                    <input
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          handleLogin();
                        }
                      }}
                      onChange={passwordInput}
                      name="password"
                      placeholder="Enter your password"
                      className={`placeholder:text-sm h-12 text-sm px-3 pr-11 disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#f0f3f1] py-2 sqc-lg rounded-md mt-2 w-full text-[#14794f] focus:outline-2 focus:outline-[#5ef7b7] border-0 placeholder:text-[#818181] `}
                      type={passwordState}
                      autoComplete="on"
                    />

                    {isTypingPassword && (
                      <HugeiconsIcon
                        icon={fieldError.password.error ? X : Tick02Icon}
                        strokeWidth={3}
                        size={20}
                        className={`absolute right-3 bottom-3.5 text-white rounded-full p-1 ${!fieldError.password.error ? "bg-[#47c276]" : "bg-[#f70d0d]"}`}
                      />
                    )}
                  </div>

                  {fieldError.password.message && (
                    <div className="text-xs text-red-500 p-1">
                      {fieldError.password.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-4 lg:flex justify-between items-center">
                <div className="flex gap-2">
                  <p className="text-sm">Show password</p>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const checked = e.target.checked;
                      checked
                        ? setPasswordState("text")
                        : setPasswordState("password");
                    }}
                  />
                </div>
                <Link
                  className="text-sm text-[#47c276] font-medium"
                  to={`/reset`}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="bg-[#1b2820] cursor-pointer text-[#f2fff7] font-medium h-12 py-1.5 sqc-lg rounded-md disabled:bg-zinc-300 disabled:text-zinc-800 w-full mt-5 focus:border-2 focus:border-[#43f186]"
              >
                Login
              </button>
              <div className="flex items-center justify-between py-5">
                <div className="border w-2/5 border-zinc-300 rounded-full"></div>
                <div className="font-bold text-sm text-zinc-500">OR</div>
                <div className="border w-2/5 border-zinc-300 rounded-full"></div>
              </div>
              <div className="flex items-center justify-center h-20 gap-3 *:border-zinc-200 *:border-2 *:rounded-lg *:p-2 *:w-1/2 *:flex *:items-center *:justify-center *:bg-zinc-100 *:cursor-pointer">
                <div className="sqc-lg">
                  <img src={xImage} alt="" className="w-7" />
                </div>
                <div className="sqc-lg">
                  <img src={googleImg} alt="" className="w-7" />
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-zinc-700">Feel free to contact us</h1>
                <p className="text-[#47c276]">support@quix.edu</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" hidden lg:flex flex-1 h-full relative"
          style={{
            backgroundImage: `url(${studyImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#5ed38521]"></div>
          <div className="flex items-center justify-center h-full">
            <div className="container font-normal flex-col bg-[#052c1a1d] w-3/5 glass-card h-7/20 flex justify-center text-white *:py-2 px-7">
              <h1 className="text-2xl">Study smarter, Finish faster</h1>
              <p className="text-sm w-5/6">
                Explore precision learning tools designed to help you retain
                more in less time. Your most productive study session starts
                right here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
