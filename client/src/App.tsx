import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import Settings from "./pages/Settings";
import { BACKEND_URI } from "./config/config.js";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  id: string;
  password?: string;
}

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
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
  );
}

export default App;
