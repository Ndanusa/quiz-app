import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import Settings from "./pages/Settings";
import { BACKEND_URI } from "./config/config.ts";
import logoImg from "./assets/logo text.svg";
import SignUp from "./pages/Signup.tsx";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookIcon,
  DashboardCircleIcon,
  DashboardSquareIcon,
  DiscoverSquareIcon,
  Logout,
  NoteAddIcon,
  Search02Icon,
  SearchIcon,
  Settings04Icon,
} from "@hugeicons/core-free-icons";
import Discover from "./pages/Discover.tsx";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentLocation = useLocation().pathname;
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
  console.log(useLocation());

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
    <>
      <div className={`${isAuth ? "flex " : ""}`}>
        {isAuth && (
          <nav className="left-0 w-fit flex flex-col sticky gap-20 items-start px-5 pr-15 py-5 bg-[#f8f8f9] border-r border-zinc-400/30 glass h-screen">
            <div className="w-full h-px bg-zinc-200 absolute left-0 top-90"></div>
            <div className="w-full h-px bg-zinc-200 absolute left-0 top-22"></div>

            <div>
              <img src={logoImg} alt="" className="w-26" />
            </div>
            <ul className="flex flex-col items-start justify-between gap-4">
              <li
                className={`w-full ${currentLocation === "/dashboard" ? "bg-[#092316]" : ""} px-5 py-2 sqc-md`}
              >
                <Link to={`/dashboard`} className={`flex items-center gap-3`}>
                  <HugeiconsIcon
                    icon={DashboardCircleIcon}
                    strokeWidth={1.6}
                    className={`text-zinc-600`}
                    size={18}
                  />
                  <p className=" text-zinc-600 text-sm">Overview</p>
                </Link>
              </li>
              <li
                className={`w-full ${currentLocation === "/create" ? "bg-[#092316]" : ""} px-5 py-2 sqc-md`}
              >
                <Link to={`/create`} className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={NoteAddIcon}
                    strokeWidth={1.6}
                    className="text-zinc-600"
                    size={18}
                  />
                  <p className=" text-zinc-600 text-sm">Create quiz</p>
                </Link>
              </li>

              <li
                className={`w-full ${currentLocation === "/explore" ? "bg-[#092316]" : ""} px-5 py-2 sqc-md`}
              >
                <Link to={`/discover`} className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={DiscoverSquareIcon}
                    strokeWidth={1.6}
                    className="text-zinc-600"
                    size={18}
                  />
                  <p className=" text-zinc-600 text-sm">Discover</p>
                </Link>
              </li>
              <li
                className={`w-full ${currentLocation === "/quizzes" ? "bg-[#092316]" : ""} px-5 py-2 sqc-md`}
              >
                <Link to={`/quizzes`} className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={BookIcon}
                    strokeWidth={1.6}
                    className="text-zinc-600"
                    size={18}
                  />
                  <p className=" text-zinc-600 text-sm">Quizzes</p>
                </Link>
              </li>
            </ul>
            <ul className={`flex flex-col gap-8 justify-between`}>
              <li
                className={`w-full ${currentLocation === "/settings" ? "bg-[#092316]" : ""} px-5 py-2 sqc-md`}
              >
                <Link to={`/settings`} className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={Settings04Icon}
                    strokeWidth={1.6}
                    className="text-zinc-600"
                    size={18}
                  />
                  <p className=" text-zinc-600 text-sm">Settings</p>
                </Link>
              </li>
              <li
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => {
                  localStorage.clear();
                  document.location.href = "/login";
                }}
              >
                <HugeiconsIcon
                  icon={Logout}
                  strokeWidth={1.6}
                  className="text-zinc-600"
                  size={18}
                />
                <p className=" text-zinc-600 text-sm">Logout</p>
              </li>
            </ul>
          </nav>
        )}
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
    </>
  );
}

export default App;
