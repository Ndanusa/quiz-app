import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Plus,
  Settings01Icon,
  LockPasswordIcon,
  Search01Icon,
  Notification,
  Notification01Icon,
} from "@hugeicons/core-free-icons";
import { BACKEND_URI, getGreeting } from "../config/config.ts";
import abstractImage from "../assets/abstract.jpg";
import logoImg from "../assets/logo.svg";

function Dashboard({ user }) {
  const greeting = getGreeting();
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {greeting}, {user.firstName}!
          </h1>
          <p className="text-[#868686] text-sm">Let's learn something today!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <HugeiconsIcon
              icon={Search01Icon}
              className="text-[#ababab] absolute left-2"
              strokeWidth={1.7}
              size={20}
            />

            <input
              type="text"
              placeholder="Search anything..."
              className="h-10 drop bg-white placeholder:text-sm w-70 pl-9 pr-5 sqc-md rounded-lg"
            />
          </div>
          <div className="w-10 h-10 bg-white flex items-center justify-center sqc-lg z-1000">
            <HugeiconsIcon
              className="text-[#4e4e4e] "
              icon={Notification01Icon}
              size={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
