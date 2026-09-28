import { useState, useRef, useEffect } from "react";

const SORT_OPTIONS = [
  { value: "default", label: "По умолчанию" },
  { value: "low-to-high", label: "Сначала дешевле" },
  { value: "high-to-low", label: "Сначала дороже" },
];

export default function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    SORT_OPTIONS.find((opt) => opt.value === value) || SORT_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between border-b border-[#d8d0c1] py-1 text-xs text-[#2c2a29] cursor-pointer hover:border-[#2c2a29] transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-3.5 h-3.5 text-[#8c8275]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
          <span>{selectedOption.label}</span>
        </div>

        <svg
          className={`w-3 h-3 text-[#8c8275] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Custom Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#f7f4ee] border border-[#e5dfd3] shadow-lg rounded-sm py-1 z-30 animate-fade-in">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer flex items-center justify-between ${value === option.value
                ? "bg-[#eae4d8] font-medium text-[#2c2a29]"
                : "text-[#6b6255] hover:bg-[#f0ebe1] hover:text-[#2c2a29]"
                }`}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <span className="text-[10px] text-[#4d7c55]">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}