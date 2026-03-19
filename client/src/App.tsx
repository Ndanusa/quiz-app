import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BACKEND_URI } from "./config/config.js";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!token) {
      return setLoading(false);
    }
    fetch(`${BACKEND_URI}/api/v1/auth/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(() => {
        setIsAuth(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuth(false);
      })
      .finally(() => setLoading(false));
  }, [token]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to={"/home"} /> : <Login />}
        />
        <Route
          path="/home"
          element={
            isAuth ? <Home validUser={user} /> : <Navigate to={"/login"} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
