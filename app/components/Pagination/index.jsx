import { ChevronDown } from "lucide-react";

export default function Pagination({ total, page, setPage, limit }) {
  const totalPages = Math.ceil(total / limit);

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 sm:px-6 dark:bg-gray-800 dark:border-gray-600">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between w-full">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Mostrando{" "}
          <span className="font-medium">{(page - 1) * limit + 1}</span> a{" "}
          <span className="font-medium">{Math.min(page * limit, total)}</span>{" "}
          de <span className="font-medium">{total}</span> entradas
        </p>

        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {/* Previous */}
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
          </button>

          {/* Pages */}
          {getPages().map((p, index) =>
            p === "..." ? (
              <span
                key={index}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => goToPage(p)}
                aria-current={p === page ? "page" : undefined}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === p
                    ? "z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-300"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <span className="sr-only">Next</span>
            <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </nav>
  );
}
