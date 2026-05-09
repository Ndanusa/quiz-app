import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import logoImgText from "../assets/logo text - 1.svg";
import logoImg from "../assets/logo - 1.svg";
import profileImage from "../assets/Picsart_25-12-26_03-05-32-526.jpg";
import {
  DashboardSquareIcon,
  DiscoverSquareIcon,
  NoteAddIcon,
  Bookmark02Icon,
  News01Icon,
  Settings03Icon,
  ArrowRight03Icon,
  ArrowLeft03Icon,
  LogoutSquare01Icon,
  Profile,
  TransactionHistoryIcon,
  Layers01Icon,
  UserGroupIcon,
  CheckListIcon,
  TaskDaily01Icon,
  PencilEdit02Icon,
  User03Icon,
  Logout,
  Quiz05Icon,
  Search01Icon,
  DashboardBrowsingIcon,
  DashboardSquare03Icon,
  DiscoverCircleIcon,
  ArrowDownDoubleIcon,
  CheckmarkCircleIcon,
  Sun01Icon,
  Notification01Icon,
  Night,
  Moon,
  Moon01Icon,
  Moon02Icon,
  ArrowDown,
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
        text: "Daily Check In",
        target: "/checkin",
        icon: TaskDaily01Icon,
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
                  ? "text-[#0e24e8] flex items-center justify-between"
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

export default function DropdownMenu({
  options,
  className,
  width = "w-30",
  dropdownPos = "right",
}: PropsInterface) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className={`w-fit relative`} ref={ref}>
      {/* SELECT BUTTON */}
      <button onClick={() => setIsOpen(!isOpen)} className={className}>
        <span className="text-sm">{selected.label}</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <HugeiconsIcon icon={ArrowDown} size={18} />
        </span>
      </button>
      {/* DROPDOWN OPTIONS */}
      {isVisible && (
        <ul
          className={`absolute mt-2 ${width} bg-white border p-3 left-0 transform transition-all duration-200 origin-top border-gray-200 sqc-lg shadow-lg overflow-hidden z-10 ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2"
          }`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className={` px-4 py-2 cursor-pointer text-sm transition-colors ${
                selected.value === option.value
                  ? "text-[#24ad6d] flex items-center justify-between"
                  : "text-gray-700 hover:bg-[#eeeeee]"
              } `}
            >
              {option.label}
              {selected.value === option.value ? (
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

export function Navigate({ isAuth, user }: NavProps) {
  const collapsedSettings =
    JSON.parse(localStorage.getItem("isCollapsed")) || false;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(collapsedSettings);
  const currentLocation = useLocation().pathname;

  useEffect(() => {
    localStorage.setItem("isCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const topLinks = [
    {
      text: "Dashboard",
      target: "/dashboard",
      icon: DashboardSquareIcon,
    },
    {
      text: "Explore",
      target: "/discover",
      icon: DiscoverSquareIcon,
    },
    {
      text: "Quizzes",
      target: "/quizzes",
      icon: Bookmark02Icon,
    },
    {
      text: "Create",
      target: "/create",
      icon: NoteAddIcon,
    },
    {
      text: "News",
      target: "/news",
      icon: News01Icon,
    },
    {
      text: "Settings",
      target: "/settings",
      icon: Settings03Icon,
    },
    {
      text: "Profile",
      target: `/${user.username}`,
      icon: Profile,
    },
  ];
  return (
    <div className="relative left-0">
      <div
        className={`relative flex flex-col left-0 justify-between  py-5 bg-white h-screen transition-all ease-[cubic-bezier(0.2,1.232,0.64,1)] duration-350 ${isCollapsed ? "w-20" : "w-60 items-start"}`}
      >
        <div
          title={isCollapsed ? "Expand" : "Collapse"}
          onClick={() => setIsCollapsed((prev) => !prev)}
          className={
            "w-0.5 h-full bg-[#e0e0e0] top-0 absolute right-0 cursor-col-resize"
          }
        ></div>
        <button
          className="absolute flex items-center justify-center cursor-col-resize p-1 top-7 -right-5 w-8 h-8  border-[#e0e0e0] bg-white border-2 sqc-lg text-[#656565]"
          title={isCollapsed ? "Open Panel" : "Close Panel"}
        >
          <HugeiconsIcon
            icon={isCollapsed ? ArrowRight03Icon : ArrowLeft03Icon}
            size={35}
            onClick={() => setIsCollapsed((prev) => !prev)}
          />
        </button>
        <div className={`${isCollapsed ? "px-5" : "px-6"} w-full pb-5`}>
          {isCollapsed ? (
            <img src={logoImg} alt="" className="w-15" />
          ) : (
            <img src={logoImgText} alt="" className="w-30" />
          )}
        </div>

        <div className="flex flex-col items-center gap-5 w-full pb-5 px-4">
          {!isCollapsed && (
            <h1 className="self-start text-sm font-medium text-[#898989] py-4">
              MAIN MENU
            </h1>
          )}

          {topLinks.map((it) => {
            const activeLocation = currentLocation.startsWith(it.target);
            return (
              <Link
                key={it.target}
                title={it.text}
                to={it.target}
                className={`flex items-center gap-3 ${isCollapsed ? "sqc-xl px-2 py-2 w-fit" : "sqc-md py-2 px-5 w-45"} ${activeLocation ? "bg-linear-165 from-[#5d6360] to-[#00130a]" : ""}`}
              >
                <HugeiconsIcon
                  icon={it.icon}
                  size={20}
                  color={`${activeLocation ? "#28f3a2" : "#2a322f"}`}
                />
                {!isCollapsed && (
                  <p
                    className={`${activeLocation ? "text-[#e4eeeb]" : "text-[#717171]"} text-[15px]`}
                  >
                    {it.text}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
        <div
          className={`${isCollapsed ? "px-4" : "px-9"} flex-col flex items-center`}
        >
          <button
            title="logout"
            className={` ${isCollapsed ? "sqc-xl px-2 py-2" : "sqc-md py-2 px-5 flex gap-3"} cursor-pointer `}
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <HugeiconsIcon
              icon={LogoutSquare01Icon}
              color="#30463e"
              size={20}
            />
            {!isCollapsed && <p className={`text-[#30463e]`}>Logout</p>}
          </button>
        </div>
      </div>
    </div>
  );
}
export function SideNavigation({ user, isAuth }: NavProps) {
  const currentLocation = useLocation().pathname;

  return (
    <div className="w-60 h-screen bg-white flex flex-col gap-4 border-r-2 border-[#f3f3f3]">
      <div className="pl-6 border-b-2 h-18 flex items-center border-[#f3f3f3]">
        <img src={logoImgText} className="w-27" alt="" />
      </div>
      {links.map((item, i) => {
        return (
          <div
            className={`${links.length - 1 !== i ? "border-b-2 border-[#f3f3f3] pb-1" : ""}`}
          >
            <h1 className="text-xs ml-6 font-medium">{item.type}</h1>
            <div className={`flex flex-col w-full pr-7 pl-2 mt-1`}>
              {item.links.map((it) => {
                const activeLocation = currentLocation.startsWith(it.target);
                return (
                  <div className="flex items-center gap-1">
                    <div
                      className={`h-8 rounded-full w-1 ${activeLocation && "bg-[#0e24e8]"}`}
                    ></div>

                    <Link
                      to={it.target}
                      key={it.target}
                      className={`flex items-center gap-3 w-full ${activeLocation ? "bg-[#e4e6f7] text-[#0e24e8]" : "hover:bg-[#f2f2f5] text-[#585858] hover:text-[#2c2c2c]"} transition-colors duration-300 ease-in px-5 py-2 sqc-md text-[12px]`}
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
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="w-full py-6 border-b-2 h-18 justify-between border-[#f3f3f3] relative top-0 bg-white flex items-center px-8">
      <div className="relative flex items-center">
        <HugeiconsIcon
          icon={Search01Icon}
          className="text-[#989898] absolute left-2 top-[11.5px]"
          strokeWidth={2.3}
          size={15}
        />

        <input
          type="text"
          placeholder="Search anything..."
          className="border-2 pl-7 h-9 text-sm border-[#eaeaea] placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-[#0e24e8] hover:border-[#0e24e8] text-[#4c4c4c] font-medium placeholder:text-[#989898] placeholder:font-medium w-65 rounded-full transition-all duration-300 px-3 py-1 bg-[#f1f2f5]"
        />
      </div>
      <div className="flex items-center gap-5">
        <button
          title={darkMode ? "Dark Mode" : "Light Mode"}
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center w-10 h-10 bg-[#f1f2f5] justify-center border-[#eaeaea] border-2 rounded-full cursor-pointer hover:bg-[#e5e5ea] hover:border-[#d6d6d6] transition-all"
        >
          <HugeiconsIcon
            icon={!darkMode ? Sun01Icon : Moon02Icon}
            size={18}
            className="text-[#707070]"
          />
        </button>
        <button
          title="Notification"
          className="flex items-center w-10 h-10 bg-[#f1f2f5] justify-center border-[#eaeaea] border-2 rounded-full cursor-pointer hover:bg-[#e5e5ea] hover:border-[#d6d6d6] transition-all relative "
        >
          <div className="absolute w-4 h-4 p-0 -top-1 -right-1 rounded-full bg-[#ff0000] flex items-center justify-center text-[9px] text-white">
            9
          </div>
          <HugeiconsIcon
            icon={Notification01Icon}
            size={18}
            className="text-[#707070]"
          />
        </button>
        <button
          title="Logout"
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="flex items-center w-10 h-10 bg-[#f1f2f5] justify-center border-[#eaeaea] border-2 rounded-full cursor-pointer hover:bg-[#e5e5ea] hover:border-[#d6d6d6] transition-all"
        >
          <HugeiconsIcon icon={Logout} size={18} className="text-[#707070]" />
        </button>
        <div
          title="Profile"
          className="border-[#eaeaea] border-2 rounded-full cursor-pointer"
        >
          <img
            src={profileImage}
            className="w-10 h-10 object-cover rounded-full "
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
