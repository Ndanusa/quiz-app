import { useState, useEffect, useRef } from "react";
import { BACKEND_URI } from "./config/config.ts";
import { HugeiconsIcon } from "@hugeicons/react";
import { Navigation } from "./components/Navigation.tsx";
import Router from "./components/Router.tsx";
import { useLocation } from "react-router-dom";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const rawUser = localStorage.getItem("user");
    if (rawUser) {
      try {
        setUser(JSON.parse(rawUser));
      } catch (err) {
        console.error("Unable to parse stored user", err);
      }
    }

    const checkAuth = async () => {
      try {
        const res = await fetch(`${BACKEND_URI}/api/v1/auth/protected`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Unauthorized");
        setIsAuth(true);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="px-7 py-5 sqc-xl text-5xl flex items-center justify-center text-[#055835] bg-[#c0ffe7]">
          Please wait
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${isAuth ? "flex" : ""} bg-linear-to-r from-[#f4f5f4] to-[#f5f7f6] h-screen`}
    >
      <div>{isAuth && <Navigation isAuth={isAuth} user={user} />}</div>
      <div className={`${isAuth ? "p-10 w-full scl" : ""} `}>
        <Router user={user} isAuth={isAuth} />
      </div>
    </div>
  );
}

export default App;
