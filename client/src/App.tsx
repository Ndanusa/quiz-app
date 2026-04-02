import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import Settings from "./pages/Settings";
import { BACKEND_URI } from "./config/config.ts";
import logoImgText from "./assets/logo text.svg";
import logoImg from "./assets/logo.svg";

import SignUp from "./pages/Signup.tsx";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookIcon,
  DashboardSquareIcon,
  DiscoverSquareIcon,
  ArrowRight03Icon,
  Logout,
  NoteAddIcon,
  Search02Icon,
  SearchIcon,
  Settings04Icon,
  ArrowLeft03Icon,
  Note01Icon,
  Bookmark02Icon,
  News01Icon,
  Settings03Icon,
  LogoutSquare01Icon,
} from "@hugeicons/core-free-icons";
import Discover from "./pages/Discover.tsx";
import Quizzes from "./pages/Quizzes.tsx";
import News from "./pages/News.tsx";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentLocation = useLocation().pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCollapsedWidth, setIsCollapsedWidth] = useState(false);
  const topLinks = [
    {
      text: "Dashboard",
      target: "/dashboard",
      icon: DashboardSquareIcon,
    },
    {
      text: "Explore",
      target: "/discover",
      icon: DiscoverSquareIcon,
    },
    {
      text: "Quizzes",
      target: "/quizzes",
      icon: Bookmark02Icon,
    },
    {
      text: "Create",
      target: "/create",
      icon: NoteAddIcon,
    },
    {
      text: "News",
      target: "/news",
      icon: News01Icon,
    },
    {
      text: "Settings",
      target: "/settings",
      icon: Settings03Icon,
    },
  ];
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
      <div className="flex items-center justify-center h-screen bg-slate-100 text-slate-700">
        <div className="px-4 py-3 rounded-lg border border-slate-200 bg-white shadow">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className={`${isAuth ? "flex" : ""}`}>
      {isAuth && (
        <div
          className={`sticky  flex gap-20 border-r-2 border-[#dfe4e2] flex-col left-0  py-5 bg-gray-200 h-screen transition-all ease-[cubic-bezier(0.8,-0.4,0.5,1)] duration-600 ${isCollapsed ? "w-25 px-1  items-center" : "w-60 px-6 items-start"}`}
        >
          <HugeiconsIcon
            icon={isCollapsed ? ArrowRight03Icon : ArrowLeft03Icon}
            className="border-2 sqc-lg border-[#d8d5d5] bg-white text-[#656565] cursor-col-resize absolute p-1 top-7 -right-5 w-8 h-8"
            size={35}
            onClick={() => {
              setIsCollapsed((prev) => {
                return !prev;
              });
              // if (isCollapsed) {
              //   setIsCollapsedWidth(false);
              //   setTimeout(() => {
              //     setIsCollapsed(false);
              //   }, 1000);
              //   setIsCollapsed(false);
              // } else {
              //   setIsCollapsedWidth(true);
              //   setTimeout(() => {
              //     setIsCollapsed(true);
              //   }, 400);
              // }
            }}
          />
          <div className="px-5">
            <Link to={"/dashboard"}>
              {isCollapsed ? (
                <img src={logoImg} alt="" className="w-15" />
              ) : (
                <img src={logoImgText} alt="" className="w-26" />
              )}
            </Link>
          </div>

          <div className="flex flex-col gap-7">
            {topLinks.map((it) => {
              const activeLocation = it.target === currentLocation;
              return (
                <button
                  title={it.text}
                  key={it.target}
                  className={` ${isCollapsed ? "sqc-xl px-3 py-3" : "sqc-md py-2 px-5"} ${activeLocation ? "bg-[#1b1d1c]" : ""}`}
                >
                  <Link to={it.target} className={`flex items-center gap-3`}>
                    <HugeiconsIcon
                      icon={it.icon}
                      size={isCollapsed ? 25 : 20}
                      color={`${activeLocation ? "#d4d4d8" : "#30463e"}`}
                    />
                    {!isCollapsed && (
                      <p
                        className={`${activeLocation ? "text-[#bcc8c4]" : "text-[#30463e]"} text-[15px]`}
                      >
                        {it.text}
                      </p>
                    )}
                  </Link>
                </button>
              );
            })}
          </div>
          <button
            title="logout"
            className={` ${isCollapsed ? "sqc-xl px-3 py-3" : "sqc-md py-2 px-5 flex gap-3"} cursor-pointer `}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            <HugeiconsIcon
              icon={LogoutSquare01Icon}
              color="#30463e"
              size={isCollapsed ? 25 : 20}
            />
            {!isCollapsed && <p className={`text-[#30463e]`}>Logout</p>}
          </button>
        </div>
      )}
      <div className={`${isAuth ? "p-10" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/dashboard" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuth ? <Navigate to="/dashboard" /> : <SignUp />}
          />
          <Route
            path="quizzes"
            element={isAuth ? <Quizzes /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/news"
            element={isAuth ? <News /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/dashboard"
            element={isAuth ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/create"
            element={isAuth ? <CreateQuiz /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/discover"
            element={isAuth ? <Discover /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/take/:id"
            element={isAuth ? <TakeQuiz /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/settings"
            element={isAuth ? <Settings /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/play"
            element={
              isAuth && user ? (
                <Dashboard validUser={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="*"
            element={<Navigate to={isAuth ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
