import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getVisiblePages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    let start = Math.max(currentPage - 2, 2);
    let end = Math.min(currentPage + 2, totalPages - 1);

    if (currentPage <= 4) {
      start = 2;
      end = 5;
    }

    if (currentPage >= totalPages - 3) {
      start = totalPages - 4;
      end = totalPages - 1;
    }

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center gap-1">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
      >
        Trước
      </button>

      {getVisiblePages().map((page, index) => {
        if (page === "...") {
          return (
            <span key={index} className="px-2 text-gray-500">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-9 rounded border px-3 py-1 text-sm transition
            ${
              currentPage === page ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
      >
        Sau
      </button>
    </div>
  );
};

export default Pagination;
