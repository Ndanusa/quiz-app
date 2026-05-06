import { useState, useEffect } from "react";
import { useLocation, Link, useLoaderData } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import logoImgText from "../assets/logo text.svg";
import logoImg from "../assets/logo.svg";
import profileImg from "../assets/profile.jpg";

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
  BookOpen02Icon,
  LeftToRightListBulletIcon,
  Layers01Icon,
  UserGroupIcon,
  CheckListIcon,
  TaskDaily01Icon,
  PencilEdit02Icon,
  User03Icon,
  Logout,
  Quiz05Icon,
} from "@hugeicons/core-free-icons";

interface NavProps {
  isAuth: boolean;
  user: Record<string, string>;
}
export function Navigation({ isAuth, user }: NavProps) {
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
export default function AltNavigation({ user, isAuth }: NavProps) {
  const currentLocation = useLocation().pathname;
  const links = [
    {
      type: "MAIN",
      links: [
        {
          text: "Dashboard",
          target: "/dashboard",
          icon: DashboardSquareIcon,
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
          icon: DashboardSquareIcon,
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
        {
          text: "Logout",
          target: "/logout",
          icon: Logout,
        },
      ],
    },
  ];

  return (
    <div className="w-60 h-screen bg-white pt-5 flex flex-col gap-5">
      {links.map((item) => {
        return (
          <div>
            <h1 className="text-xs ml-6 font-medium">{item.type}</h1>
            <div className="flex flex-col w-full pr-7 pl-4 mt-1 relative">
              {item.links.map((it) => {
                const activeLocation = currentLocation.startsWith(it.target);
                return (
                  <>
                    {activeLocation && (
                      <div className="absolute w-1 h-8 top-1 rounded-full left-1 bg-[#2035f3]"></div>
                    )}
                    <Link
                      to={it.target}
                      key={it.target}
                      className={`flex items-center gap-3 w-full ${activeLocation ? "bg-[#e4e6f7] text-[#2035f3]" : ""}  px-5 py-2.5 sqc-md text-[13px]`}
                    >
                      <HugeiconsIcon icon={it.icon} size={18} />
                      {it.text}
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

{
  /* <div className="flex flex-col gap-3 w-full pr-7 pl-3">
        
      </div> */
}
