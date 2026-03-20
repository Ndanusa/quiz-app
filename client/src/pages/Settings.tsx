import { useState } from "react";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const save = () => {
    setMessage("Settings saved (frontend-only demo). ");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-4">
      <div className="mx-auto max-w-3xl bg-white p-6 rounded-2xl sqc-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-slate-500 text-sm">
              Manage profile and app preferences.
            </p>
          </div>
          <Link to="/dashboard" className="text-indigo-600 text-sm">
            Back to dashboard
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 border border-slate-200 rounded-lg sqc-lg p-2">
            <HugeiconsIcon icon={ViewIcon} size={20} color="#0f172a" />
            <div className="w-full">
              <label className="text-sm font-medium">Display Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full mt-1 border border-slate-300 rounded-md sqc-md px-3 py-2"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 border border-slate-200 rounded-lg sqc-lg p-2">
            <HugeiconsIcon icon={Mail01Icon} size={20} color="#0f172a" />
            <div className="w-full">
              <label className="text-sm font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full mt-1 border border-slate-300 rounded-md sqc-md px-3 py-2"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 border border-slate-200 rounded-lg sqc-lg p-2">
            <HugeiconsIcon icon={LockPasswordIcon} size={20} color="#0f172a" />
            <div className="w-full">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="New password"
                className="w-full mt-1 border border-slate-300 rounded-md sqc-md px-3 py-2"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 border border-slate-200 rounded-lg sqc-lg p-2">
            <HugeiconsIcon icon={ViewOffIcon} size={20} color="#0f172a" />
            <div className="w-full">
              <label className="text-sm font-medium">Privacy</label>
              <select className="w-full mt-1 border border-slate-300 rounded-md sqc-md px-2 py-2">
                <option>Public</option>
                <option>Private</option>
                <option>Protected</option>
              </select>
            </div>
          </div>
        </div>
        <button
          onClick={save}
          className="mt-4 px-3 py-2 rounded-lg bg-black text-white">
          Save changes
        </button>
        {message && (
          <div className="mt-2 text-sm text-green-700">{message}</div>
        )}
      </div>
    </div>
  );
}

export default Settings;
