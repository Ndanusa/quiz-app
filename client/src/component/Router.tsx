import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import History from "../pages/History.tsx";
import Settings from "../pages/Settings.tsx";
import Progress from "../pages/Progress.tsx";
import Quizzes from "../pages/Quizzes.tsx";
import SignUp from "../pages/Signup.tsx";
import News from "../pages/News.tsx";
import { useEffect, useRef, useState } from "react";
import Profile from "../pages/Profile.tsx";
import NotFound from "../pages/NotFound.tsx";
import Bookmarks from "../pages/Bookmarks.tsx";
import Leaderboard from "../pages/Leaderboard.tsx";
import Achievememnts from "../pages/Achievements.tsx";
import Blog from "../pages/Blog.tsx";
import CreateQuiz from "../pages/CreateQuiz.tsx";
import UserQuizzes from "../pages/UserQuizzes.tsx";

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
        path={`/${user?.username}`}
        element={isAuth ? <Profile /> : <Navigate to={"/login"} />}
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
        path="/bookmarks"
        element={isAuth ? <Bookmarks /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/leaderboard"
        element={isAuth ? <Leaderboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/achievements"
        element={isAuth ? <Achievememnts /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/blog"
        element={isAuth ? <Blog /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/history"
        element={isAuth ? <History /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/progress"
        element={isAuth ? <Progress /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/settings"
        element={isAuth ? <Settings /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/create"
        element={isAuth ? <CreateQuiz /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/myquizzes"
        element={isAuth ? <UserQuizzes /> : <Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={isAuth ? <NotFound /> : <Navigate to={"/login"} replace />}
      ></Route>

      <Route
        path="/"
        element={<Navigate to={isAuth ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}
export default Router;
