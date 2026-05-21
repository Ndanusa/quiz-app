import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import logoImgText from "../assets/logo text light.svg";
import logoImg from "../assets/logo light.svg";
import profileImage from "../assets/Picsart_25-12-26_03-05-32-526.jpg";
import {
  Bookmark02Icon,
  Settings03Icon,
  TransactionHistoryIcon,
  Layers01Icon,
  UserGroupIcon,
  CheckListIcon,
  PencilEdit02Icon,
  User03Icon,
  Logout,
  Quiz05Icon,
  Search01Icon,
  DashboardBrowsingIcon,
  DiscoverCircleIcon,
  CheckmarkCircleIcon,
  Notification01Icon,
  ArrowDown,
  StarAward01Icon,
  Sun01Icon,
  Moon02Icon,
} from "@hugeicons/core-free-icons";
const links = [
  {
    type: "MAIN",
    links: [
      {
        text: "Dashboard",
        target: "/dashboard",
        icon: DiscoverCircleIcon,
      },
      {
        text: "Quizzes",
        target: "/quizzes",
        icon: Quiz05Icon,
      },
    ],
  },
  {
    type: "LEARNING",
    links: [
      {
        text: "Progress",
        target: "/progress",
        icon: DashboardBrowsingIcon,
      },
      {
        text: "History",
        target: "/history",
        icon: TransactionHistoryIcon,
      },
      {
        text: "Bookmarks",
        target: "/bookmarks",
        icon: Bookmark02Icon,
      },
    ],
  },
  {
    type: "ENGAGEMENT",
    links: [
      {
        text: "Leaderboard",
        target: "/leaderboard",
        icon: Layers01Icon,
      },
      {
        text: "Achievements",
        target: "/achievements",
        icon: StarAward01Icon,
      },
      {
        text: "Blog",
        target: "/blog",
        icon: UserGroupIcon,
      },
    ],
  },
  {
    type: "CREATE",
    links: [
      {
        text: "Create Quiz",
        target: "/create",
        icon: PencilEdit02Icon,
      },
      {
        text: "My Quizzes",
        target: "/myquizzes",
        icon: CheckListIcon,
      },
    ],
  },
  {
    type: "ACCOUNT",
    links: [
      {
        text: "Profile",
        target: "/profile",
        icon: User03Icon,
      },
      {
        text: "Settings",
        target: "/settings",
        icon: Settings03Icon,
      },
    ],
  },
];
interface NavProps {
  isAuth: boolean;
  user: Record<string, string>;
}

interface PropsInterface {
  options: {
    value: string | number;
    label: string;
  }[];
  width: string;
  className: string;
  dropdownPos: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  width = "w-50",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  const ref = useRef(null);

  // OPEN/CLOSE ANIMATION
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);

      requestAnimationFrame(() => {
        setAnimate(true);
      });
    } else {
      setAnimate(false);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-fit relative" ref={ref}>
      {/* SELECT BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={className}
      >
        <span>{value ? value.label : placeholder}</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <HugeiconsIcon icon={ArrowDown} size={18} />
        </span>
      </button>

      {/* OPTIONS */}
      {isVisible && (
        <ul
          className={`absolute mt-2 ${width} bg-white border p-3 left-0 transform transition-all duration-200 origin-top border-gray-200 sqc-lg shadow-lg overflow-hidden z-50 ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2"
          }`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={` px-4 py-2 cursor-pointer text-sm transition-colors ${
                value?.value === option.value
                  ? "text-[#0e24e8] dark:text-[#c5b3ff] flex items-center justify-between"
                  : "text-[#4e4e4e] hover:bg-[#eeeeee]"
              } `}
            >
              {option.label}
              {value?.value === option.value ? (
                <HugeiconsIcon icon={CheckmarkCircleIcon} size={16} />
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SideNavigation({ user, isAuth }: NavProps) {
  const currentLocation = useLocation().pathname;

  return (
    <div className="w-60 h-screen dark:bg-[#000411] dark:border-[#2a2a2a] bg-white flex flex-col gap-4 border-r-2 border-[#f3f3f3]">
      <div className="pl-6 border-b-2 h-18 flex items-center dark:border-[#2a2a2a] border-[#f3f3f3]">
        <img src={logoImgText} className="w-27 " alt="" />
      </div>
      {links.map((item, i) => {
        return (
          <div
            key={item.type}
            className={`${links.length - 1 !== i ? "border-b-2 dark:border-[#2a2a2a] border-[#f3f3f3] pb-1" : ""}`}
          >
            <h1 className="text-xs ml-6 font-medium dark:text-white">
              {item.type}
            </h1>
            <div className={`flex flex-col w-full pr-7 pl-2 mt-1`}>
              {item.links.map((it) => {
                const activeLocation = currentLocation.startsWith(it.target);
                return (
                  <div key={it.target} className="flex items-center gap-1">
                    <div
                      className={`h-8 rounded-full w-1 ${activeLocation && "bg-[#0e24e8] dark:bg-[#c5b3ff]"}`}
                    ></div>

                    <Link
                      to={it.target}
                      key={it.target}
                      className={`flex items-center gap-3 w-full ${activeLocation ? "bg-[#e4e6f7] dark:bg-[#2a1d4a] dark:text-[#c5b3ff] text-[#0e24e8]" : "hover:bg-[#f2f2f5] hover:dark:bg-[#3a3a42] hover:dark:text-[#e8e8e8] dark:text-[#b0b0b0] text-[#585858] hover:text-[#2c2c2c]"} transition-colors duration-300 ease-in px-5 py-2 sqc-md text-[12px]`}
                    >
                      <HugeiconsIcon icon={it.icon} size={18} />
                      {it.text}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TopNavigation() {
  const pathname = useLocation().pathname.split("/")[1];
  const title = {
    settings: "Settings",
    dashboard: "Dashboard",
    quizzes: "Quizzes",
    news: "News",
    create: "Create",
    progress: "Progress",
    history: "History",
    bookmarks: "Bookmarks",
    blog: "Blog",
    achievements: "Achievements",
    leaderboard: "Leaderboard",
    myquizzes: "My Quizzes",
    profile: "Profile",
  };
  const pageTitle = title[pathname] || "404";
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="w-full py-6 border-b-2 h-18 justify-between dark:border-[#2a2a2e] border-[#f3f3f3] sticky top-0 dark:bg-black bg-white flex items-center px-8">
      <div>
        <h1 className="text-2xl dark:text-white font-semibold capitalize">
          {pageTitle}
        </h1>
      </div>
      <div className="flex items-center gap-10">
        <div className="relative flex items-center">
          <HugeiconsIcon
            icon={Search01Icon}
            className="text-[#989898] dark:text-[#7a7a7a] absolute left-2 top-[11.5px]"
            strokeWidth={2.3}
            size={15}
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="border-2 pl-7 h-9 text-sm border-[#eaeaea] dark:text-[#d0d0d2] placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-[#0e24e8] hover:border-[#0e24e8] hover:dark:border-[#c5b3ff] focus:dark:ring-[#c5b3ff] text-[#4c4c4c] font-medium placeholder:text-[#c5c5c5] placeholder:dark:text-[#7a7a7e] placeholder:font-medium w-65 rounded-full transition-all duration-200 px-3 py-1 bg-[#f1f2f5] dark:bg-[#2c2c31] dark:border-[#4a4a4f]"
          />
        </div>
        <div className="flex items-center gap-3">
          <img
            title="Profile"
            src={profileImage}
            className="w-10 h-10 object-cover border-[#eaeaea] dark:border-[#4a4a4f] border-2 rounded-full cursor-pointer "
            alt=""
          />
          <button
            title="Notification"
            className="flex items-center w-10 h-10 bg-[#f1f2f5] dark:bg-[#2c2c31] dark:border-[#4a4a4f]  justify-center border-[#eaeaea] border-2 rounded-full cursor-pointer hover:bg-[#e5e5ea] hover:border-[#d6d6d6] hover:dark:bg-[#3a3a40] hover:dark:border-[#4a4a50] transition-all relative"
          >
            <div className="absolute w-4 h-4 p-0 -top-1 -right-1 rounded-full bg-[#ff0000] flex items-center justify-center text-[9px] text-white">
              9
            </div>
            <HugeiconsIcon
              icon={Notification01Icon}
              size={18}
              className="text-[#707070] dark:text-[#a8a8aa]"
            />
          </button>
          <button
            title="Logout"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex items-center w-10 h-10 bg-[#f1f2f5] dark:bg-[#2c2c31] dark:border-[#4a4a4f] justify-center border-[#eaeaea] border-2 rounded-full cursor-pointer hover:bg-[#e5e5ea] hover:border-[#d6d6d6] hover:dark:bg-[#3a3a40] hover:dark:border-[#4a4a50] transition-all"
          >
            <HugeiconsIcon
              icon={Logout}
              size={18}
              className="text-[#707070] dark:text-[#a8a8aa]"
            />
          </button>
          <button
            title={darkMode ? "Dark Mode" : "Light Mode"}
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center w-10 h-10 bg-[#f1f2f5] dark:bg-[#2c2c31] dark:border-[#4a4a4f] justify-center border-[#eaeaea] border-2 rounded-full cursor-pointer hover:bg-[#e5e5ea] hover:border-[#d6d6d6] hover:dark:bg-[#3a3a40] hover:dark:border-[#4a4a50] transition-all"
          >
            <HugeiconsIcon
              icon={!darkMode ? Sun01Icon : Moon02Icon}
              size={18}
              className="text-[#707070] dark:text-[#a8a8aa]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
