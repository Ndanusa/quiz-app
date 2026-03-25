import { HugeiconsIcon } from "@hugeicons/react";
import studyImg from "../assets/study.jpg";
import logoImg from "../assets/logo text.svg";
import googleImg from "../assets/google.svg";
import xImage from "../assets/x.svg";
import { getGreeting, BACKEND_URI } from "../config/config";
import axios from "axios";
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
  GraduateMaleIcon,
} from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

function SignUp() {
  const emailRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [isTyping, setIsTyping] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
  });
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [fieldError, setFieldError] = useState({
    email: { error: false, message: "" },
    password: { error: false, message: "" },
    firstName: { error: false, message: "" },
    lastName: { error: false, message: "" },
    username: { error: false, message: "" },
  });
  const [loading, setLoading] = useState(false);
  const [passwordState, setPasswordState] = useState("password");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setIsTyping((prev) => ({ ...prev, [name]: true }));

    setForm((prev) => ({ ...prev, [name]: value }));

    setFieldError((prev) => ({
      ...prev,
      [name]: {
        error: !value,
        message: !name ? `${name} is required` : "",
      },
    }));
  };

  async function handleSignup() {
    let errors = {};

    Object.keys(form).forEach((key) => {
      if (!form[key].trim()) {
        errors[key] = {
          error: true,
          message: `${key} is required`,
        };
      }
    });

    setFieldError((prev) => ({
      ...prev,
      ...errors,
    }));

    setIsTyping({
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
    });

    if (Object.keys(errors).length > 0) return;
    try {
      const res = await axios.post(`${BACKEND_URI}/api/v1/auth/sign-up`, form);
      !res.data.error && setSuccess(true);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.type === "email") {
        setIsTyping((prev) => ({ ...prev, email: true }));
        return setFieldError((prev) => ({
          ...prev,
          email: { error: true, message: error.response.data.message },
        }));
      }
      if (error.response.data.type === "username") {
        setIsTyping((prev) => ({ ...prev, username: true }));
        return setFieldError((prev) => ({
          ...prev,
          username: { error: true, message: error.response.data.message },
        }));
      }
    }
  }

  return (
    <div className={"flex items-center h-screen"}>
      <div className="flex-1 h-full relative p-5 auth">
        <div className="flex items-center justify-between sticky top-0">
          <img src={logoImg} alt="" className="w-25" />
          <Link
            to={`/login`}
            className="h-10 bg-[#1b2820] text-[#f2fff7] px-7 sqc-lg flex items-center justify-center">
            Login
          </Link>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center h-full ">
          <div className="lg:w-11/20">
            <div>
              <div className="text-center *:py-1 py-10">
                <h1 className="font-semibold text-3xl text-zinc-700">Signup</h1>
                <p className="text-gray-600 text-sm">
                  You're one step from joining the community
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <div className="w-full">
                <div className="flex items-center relative">
                  <input
                    onKeyUp={(e) => {
                      if (e.key === "Enter") handleSignup();
                    }}
                    onChange={handleChange}
                    name="firstName"
                    ref={emailRef}
                    placeholder="First Name"
                    className={`placeholder:text-sm h-10 text-sm disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#f0f3f1] py-2 px-3 sqc-lg rounded-md w-full mt-2 text-[#14794f] focus:outline-2 focus:outline-[#5ef7b7] border-0 placeholder:text-[#818181] `}
                    type="text"
                  />
                  {isTyping.firstName && (
                    <HugeiconsIcon
                      icon={fieldError.firstName.error ? X : Tick02Icon}
                      strokeWidth={3}
                      size={20}
                      className={`absolute right-3 bottom-3 $  text-white rounded-full p-1 ${!fieldError.firstName.error ? "bg-[#47c276]" : "bg-[#f70d0d]"}`}
                    />
                  )}
                </div>
                {fieldError.firstName.message && (
                  <div className="text-xs text-red-500 p-1">
                    {fieldError.firstName.message}
                  </div>
                )}
              </div>
              <div className="w-full">
                <div className="flex items-center relative">
                  <input
                    onKeyUp={(e) => {
                      if (e.key === "Enter") handleSignup();
                    }}
                    onChange={handleChange}
                    name="lastName"
                    ref={emailRef}
                    placeholder="Last Name"
                    className={`placeholder:text-sm h-10 text-sm disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#f0f3f1] py-2 px-3 sqc-lg rounded-md w-full mt-2 text-[#14794f] focus:outline-2 focus:outline-[#5ef7b7] border-0 placeholder:text-[#818181] `}
                    type="text"
                  />
                  {isTyping.lastName && (
                    <HugeiconsIcon
                      icon={fieldError.lastName.error ? X : Tick02Icon}
                      strokeWidth={3}
                      size={20}
                      className={`absolute right-3 bottom-3 $  text-white rounded-full p-1 ${!fieldError.lastName.error ? "bg-[#47c276]" : "bg-[#f70d0d]"}`}
                    />
                  )}
                </div>
                {fieldError.lastName.message && (
                  <div className="text-xs text-red-500 p-1">
                    {fieldError.lastName.message}
                  </div>
                )}
              </div>
              <div className="w-full">
                <div className="flex items-center relative">
                  <input
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleSignup();
                      }
                    }}
                    onChange={handleChange}
                    name="username"
                    ref={emailRef}
                    placeholder="Username"
                    className={`placeholder:text-sm h-10 text-sm disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#f0f3f1] py-2 px-3 sqc-lg rounded-md w-full mt-2 text-[#14794f] focus:outline-2 focus:outline-[#5ef7b7] border-0 placeholder:text-[#818181] `}
                    type="text"
                  />
                  {isTyping.username && (
                    <HugeiconsIcon
                      icon={fieldError.username.error ? X : Tick02Icon}
                      strokeWidth={3}
                      size={20}
                      className={`absolute right-3 bottom-3 $  text-white rounded-full p-1 ${!fieldError.username.error ? "bg-[#47c276]" : "bg-[#f70d0d]"}`}
                    />
                  )}
                </div>
                {fieldError.username.message && (
                  <div className="text-xs text-red-500 p-1">
                    {fieldError.username.message}
                  </div>
                )}
              </div>
              <div className="w-full">
                <div className="flex items-center relative">
                  <input
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleSignup();
                      }
                    }}
                    onChange={handleChange}
                    name="email"
                    ref={emailRef}
                    placeholder="Email"
                    className={`placeholder:text-sm h-10 text-sm disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#f0f3f1] py-2 px-3 sqc-lg rounded-md w-full mt-2 text-[#14794f] focus:outline-2 focus:outline-[#5ef7b7] border-0 placeholder:text-[#818181] `}
                    type="email"
                  />
                  {isTyping.email && (
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
                        handleSignup();
                      }
                    }}
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    className={`placeholder:text-sm h-10 text-sm px-3 pr-11 disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#f0f3f1] py-2 sqc-lg rounded-md mt-2 w-full text-[#14794f] focus:outline-2 focus:outline-[#5ef7b7] border-0 placeholder:text-[#818181] `}
                    type={passwordState}
                    autoComplete="on"
                  />

                  {isTyping.password && (
                    <HugeiconsIcon
                      icon={fieldError.password.error ? X : Tick02Icon}
                      strokeWidth={3}
                      size={20}
                      className={`absolute right-3 bottom-3 text-white rounded-full p-1 ${!fieldError.password.error ? "bg-[#47c276]" : "bg-[#f70d0d]"}`}
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
            <div className="flex pt-4 gap-2">
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
            {success && (
              <p className="">
                Account created succesfully, please{" "}
                <Link to={"login"} className="text-[#1cd283] font-bold">
                  {" "}
                  login{" "}
                </Link>{" "}
                to continue.
              </p>
            )}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="bg-[#1b2820] cursor-pointer text-[#f2fff7] font-medium h-10 py-1.5 sqc-lg rounded-md disabled:bg-zinc-300 disabled:text-zinc-800 w-full mt-5 focus:border-2 focus:border-[#43f186]">
              Signup
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
        }}>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#5ed38521]"></div>
        <div className="flex items-center justify-center h-full">
          <div className="container font-normal flex-col bg-[#052c1a1d] w-3/5 glass-card h-7/20 flex justify-center text-white *:py-2 px-7">
            <h1 className="text-2xl">Study smarter, Finish faster</h1>
            <p className="text-sm w-5/6">
              Explore precision learning tools designed to help you retain more
              in less time. Your most productive study session starts right here
            </p>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default SignUp;
