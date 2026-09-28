import React from "react";
import SortDropdown from "./SortDropdown";
import { CATEGORIES, PRODUCTS } from "../data/products";

export default function Sidebar({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  handleFilterChange,
  resetFilters,
}) {
  const isFiltered = selectedCategory !== "Все" || search || sortBy !== "default";

  return (
    <aside className="lg:col-span-1 space-y-8">
      {/* Search input */}
      <div className="space-y-2">
        <label className="text-xs font-serif italic text-[#8c8275] block">
          Поиск
        </label>
        <div className="relative flex items-center border-b border-[#d8d0c1] focus-within:border-[#2c2a29] transition-colors py-1">
          <svg
            className="w-3.5 h-3.5 text-[#8c8275] mr-2 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Название товара..."
            value={search}
            onChange={(e) => handleFilterChange(setSearch, e.target.value)}
            className="w-full bg-transparent text-xs outline-none placeholder:text-[#b0a798]"
          />
          {search && (
            <button
              onClick={() => handleFilterChange(setSearch, "")}
              className="text-xs text-[#8c8275] hover:text-[#2c2a29] px-1 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <label className="text-xs font-serif italic text-[#8c8275] block">
          Категории
        </label>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(setSelectedCategory, cat)}
              className={`w-full text-left py-1.5 px-2 rounded text-xs flex items-center justify-between transition-all duration-200 cursor-pointer ${selectedCategory === cat
                  ? "bg-[#eae4d8] font-semibold text-[#2c2a29] translate-x-1"
                  : "text-[#6b6255] hover:text-[#2c2a29] hover:translate-x-0.5"
                }`}
            >
              <span>{cat}</span>
              <span className="text-[10px] opacity-60">
                {cat === "Все"
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filtering */}
      <div className="space-y-2 pt-4 border-t border-[#e5dfd3]">
        <label className="text-xs font-serif italic text-[#8c8275] block">
          Сортировка по цене
        </label>
        <SortDropdown
          value={sortBy}
          onChange={(val) => handleFilterChange(setSortBy, val)}
        />
      </div>


      {isFiltered && (
        <button
          onClick={resetFilters}
          className="text-xs text-[#8c8275] underline hover:text-[#2c2a29] transition-colors pt-2 cursor-pointer block"
        >
          Сбросить фильтры
        </button>
      )}
    </aside>
  );
}