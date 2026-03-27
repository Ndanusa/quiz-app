import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import Settings from "./pages/Settings";
import { BACKEND_URI } from "./config/config.ts";
import logoImg from "./assets/logo.svg";
import SignUp from "./pages/Signup.tsx";

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
      <div className="flex items-center justify-center h-screen bg-slate-100 text-slate-700">
        <div className="px-4 py-3 rounded-lg border border-slate-200 bg-white shadow">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuth && (
        <nav className="flex items-center justify-between px-10 py-3 bg-[#e8fff23d] border-b-2 border-zinc-100/50 glass sticky top-0">
          <div>
            <img src={logoImg} alt="" className="w-12" />
          </div>
          <ul className="flex items-center justify-between gap-10">
            <li>
              <Link to={"/home"}>Home</Link>
            </li>
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <Link to={"/settings"}>Settings</Link>
            </li>
            <li>
              <Link to={"/take"}>Quizes</Link>
            </li>
            <li>
              <Link to={"/create"}>Create</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuth ? <Navigate to="/home" /> : <SignUp />}
        />
        <Route
          path="/home"
          element={
            isAuth && user ? <Dashboard /> : <Navigate to="/login" replace />
          }
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
              <Home validUser={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuth ? "/home" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;
