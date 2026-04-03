import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import logoImgText from "./assets/logo text.svg";
import logoImg from "./assets/logo.svg";
import {
  DashboardSquareIcon,
  DiscoverSquareIcon,
  NoteAddIcon,
  Bookmark02Icon,
  News01Icon,
  Settings03Icon,
  ArrowRight03Icon,
  Logout,
  Search02Icon,
  SearchIcon,
  Settings04Icon,
  ArrowLeft03Icon,
  Note01Icon,
  LogoutSquare01Icon,
} from "@hugeicons/core-free-icons";
function Navigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentLocation = useLocation().pathname;

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
  ];
  return (
    <div>
      {isAuth && (
        <div
          className={`sticky  flex gap-20 border-r-2 border-[#dfe4e2] flex-col left-0  py-5 bg-gray-200 h-screen transition-all ease-[cubic-bezier(1,0,0,1)] duration-250 ${isCollapsed ? "w-25 px-1  items-center" : "w-60 px-6 items-start"}`}
        >
          <button
            className="absolute flex items-center justify-center cursor-col-resize p-1 top-7 -right-5 w-8 h-8  border-[#d8d5d5] bg-white border-2 sqc-lg text-[#656565]"
            title={isCollapsed ? "Open Panel" : "Close Panel"}
          >
            <HugeiconsIcon
              icon={isCollapsed ? ArrowRight03Icon : ArrowLeft03Icon}
              size={35}
              onClick={() => setIsCollapsed((prev) => !prev)}
            />
          </button>

          <div className="px-5">
            <Link to={"/dashboard"}>
              {isCollapsed ? (
                <img src={logoImg} alt="" className="w-15" />
              ) : (
                <img src={logoImgText} alt="" className="w-26" />
              )}
            </Link>
          </div>

          <div className="flex flex-col gap-7">
            {topLinks.map((it) => {
              const activeLocation = it.target === currentLocation;
              return (
                <button
                  title={it.text}
                  key={it.target}
                  className={` ${isCollapsed ? "sqc-xl px-3 py-3" : "sqc-md py-2 px-5"} ${activeLocation ? "bg-[#1b1d1c]" : ""}`}
                >
                  <Link to={it.target} className={`flex items-center gap-3`}>
                    <HugeiconsIcon
                      icon={it.icon}
                      size={isCollapsed ? 25 : 20}
                      color={`${activeLocation ? "#d4d4d8" : "#30463e"}`}
                    />
                    {!isCollapsed && (
                      <p
                        className={`${activeLocation ? "text-[#bcc8c4]" : "text-[#30463e]"} text-[15px]`}
                      >
                        {it.text}
                      </p>
                    )}
                  </Link>
                </button>
              );
            })}
          </div>
          <button
            title="logout"
            className={` ${isCollapsed ? "sqc-xl px-3 py-3" : "sqc-md py-2 px-5 flex gap-3"} cursor-pointer `}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            <HugeiconsIcon
              icon={LogoutSquare01Icon}
              color="#30463e"
              size={isCollapsed ? 25 : 20}
            />
            {!isCollapsed && <p className={`text-[#30463e]`}>Logout</p>}
          </button>
        </div>
      )}
    </div>
  );
}

export default Navigation;
