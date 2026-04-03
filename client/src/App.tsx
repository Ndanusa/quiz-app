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
  const validUser = JSON.parse(localStorage.getItem("user"));

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
            element={
              isAuth ? (
                <Dashboard validUser={validUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
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
