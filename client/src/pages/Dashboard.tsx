import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar,
  Download02Icon,
  Fire,
  Fire02Icon,
  Fire03Icon,
} from "@hugeicons/core-free-icons";
import { BACKEND_URI } from "../config/config.ts";
import { Select } from "../component/Components.tsx";

function Dashboard({ user }) {
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  return (
    <div className="p-10 h-full">
      <div>
        <h1 className="text-xl font-medium">My Progress</h1>
        <div className="w-full bg-[#30334f] px-10 py-5 sqc-xl text-white">
          <p className="text-lg font-medium">
            Hi, <span className="capitalize">{user.firstName}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
