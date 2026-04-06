import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CreateQuiz from "../pages/CreateQuiz";
import TakeQuiz from "../pages/TakeQuiz";
import Settings from "../pages/Settings";
import Discover from "../pages/Discover.tsx";
import Quizzes from "../pages/Quizzes.tsx";
import SignUp from "../pages/Signup.tsx";
import News from "../pages/News.tsx";
import { useEffect, useRef, useState } from "react";

function Router({ isAuth, user }) {
  const locationRef = useRef<string>("/dashboard");
  const path = useLocation().pathname;
  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("last-route", path);
    }
    locationRef.current = localStorage.getItem("last-route") || "/dashboard";
  }, [path]);

  return (
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
        element={
          isAuth ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login location={locationRef.current} />
          )
        }
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
          isAuth ? <Dashboard user={user} /> : <Navigate to="/login" replace />
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
            <Dashboard user={user} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/"
        element={<Navigate to={isAuth ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}
export default Router;
