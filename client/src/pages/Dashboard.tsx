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
  Calendar,
  Download,
} from "@hugeicons/core-free-icons";
import { BACKEND_URI, getGreeting } from "../config/config.ts";
import abstractImage from "../assets/abstract.jpg";
import logoImg from "../assets/logo.svg";
import DropdownMenu from "../component/Components.tsx";

function Dashboard({ user }) {
  const greeting = getGreeting();
  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center bg-white px-4 h-10 rounded-full border-[#f3f3f3] border-2">
            <p className="flex items-center text-sm text-[#808080] gap-3 h-full border-r-2 pr-3 border-[#f3f3f3]">
              <HugeiconsIcon icon={Calendar} size={17} />
              <span>Apr 1, 2026 - May 1, 2026</span>
            </p>
            <div className="pl-4">
              <DropdownMenu
                className="flex items-center gap-2 text-[#808080]"
                width="w-50"
                dropdownPos="left"
                options={[
                  { label: "Last hour", value: 1 },
                  { label: "24 Hours", value: 24 },
                  { label: "1 Week", value: 168 },
                  { label: "2 Weeks", value: 336 },
                  { label: "30 Days", value: 720 },
                  { label: "3 Months", value: 2160 },
                  { label: "6 Months", value: 4320 },
                  { label: "1 Year", value: 65700 },
                ]}
              />
            </div>
          </div>
          <button className="bg-[#5161eb] rounded-full flex items-center gap-2 justify-center text-white cursor-pointer h-10 px-4 text-sm">
            <HugeiconsIcon icon={Download} size={17} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
