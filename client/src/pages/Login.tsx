import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/config.js";
function Login() {
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });
  async function handleLogin() {
    if (!loginDetail.email || !loginDetail.password) return;

    const res = await axios.post(
      `${BACKEND_URI}/api/v1/auth/sign-in`,
      loginDetail,
    );
    if (res.statusText === "OK") {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("token", res.data.token);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">
                <p className="text-sm">Email</p>
                <input
                  name="email"
                  placeholder="Enter your email"
                  className="bg-zinc-200 rounded-sm placeholder:text-xs px-2 py-1"
                  type="email"
                  onChange={(e) => {
                    setLoginDetail({
                      email: e.target.value,
                      password: "",
                    });
                    console.log(loginDetail.email);
                  }}
                />
              </label>
              <label htmlFor="password">
                <p className="text-sm">Password</p>
                <input
                  name="password"
                  placeholder="Enter your password"
                  className="bg-zinc-200 rounded-sm placeholder:text-xs px-2 py-1"
                  type="password"
                />
              </label>
            </div>
            <button
              onClick={handleLogin}
              className="bg-zinc-700 text-zinc-200 text-sm py-1.5 rounded-md">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
