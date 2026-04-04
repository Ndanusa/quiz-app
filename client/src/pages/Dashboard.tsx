import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Plus,
  Settings01Icon,
  LockPasswordIcon,
} from "@hugeicons/core-free-icons";
import { BACKEND_URI } from "../config/config.ts";
import CircularProgress from "../components/ProgressBar.tsx";

function Dashboard({ user }) {
  const target = {
    taken: 380,
    passed: 152,
  };
  const percentage = (target.passed / target.taken) * 100;
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium">
            Hi <span className="font-bold">{user.firstName}</span>{" "}
          </h1>
          <p className="text-gray-500">Let's learn something today</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
