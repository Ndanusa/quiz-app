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

function Dashboard({ validUser }) {
  return (
    <div className="p-10">
      <div>
        <h1 className="text-4xl">
          Hi, <span className="font-bold">{validUser.firstName}</span>
        </h1>
      </div>
    </div>
  );
}

export default Dashboard;
