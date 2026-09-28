import React from "react";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-10">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        className="px-3 py-1 text-xs text-[#8c8275] hover:text-[#2c2a29] disabled:opacity-30 disabled:hover:text-[#8c8275] cursor-pointer"
      >
        ← Назад
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-7 h-7 rounded-full text-xs transition-all cursor-pointer ${currentPage === page
              ? "bg-[#2c2a29] text-[#f7f4ee] font-medium"
              : "text-[#6b6255] hover:bg-[#eae4d8]"
            }`}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
        className="px-3 py-1 text-xs text-[#8c8275] hover:text-[#2c2a29] disabled:opacity-30 disabled:hover:text-[#8c8275] cursor-pointer"
      >
        Вперед →
      </button>
    </div>
  );
}