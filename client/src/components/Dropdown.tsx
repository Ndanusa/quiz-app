import { useState, useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDownDoubleIcon,
  CheckmarkCircleIcon,
} from "@hugeicons/core-free-icons";

interface PropsInterface {
  options: {
    value: string;
    label: string;
  }[];
  buttonClassName: string;
}
export default function DropdownMenu({
  options,
  buttonClassName,
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
    <div className="w-64 relative" ref={ref}>
      {/* SELECT BUTTON */}
      <button onClick={() => setIsOpen(!isOpen)} className={buttonClassName}>
        <span className="text-sm">{selected.label}</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <HugeiconsIcon icon={ArrowDownDoubleIcon} size={18} />
        </span>
      </button>

      {/* DROPDOWN OPTIONS */}
      {isVisible && (
        <ul
          className={`absolute mt-2 w-6/10 bg-white border p-3 transform transition-all duration-200 origin-top border-gray-200 sqc-lg shadow-lg overflow-hidden z-10 ${
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
