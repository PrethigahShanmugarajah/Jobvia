// Jobvia / Client / src / components / Pagination.jsx
import { useMemo } from "react";
import { MoreHorizontal } from "lucide-react";
import { SelectInput } from "./FormField/SelectInput";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 10,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 15, 25],
  color = "blue",
  className = "",
  showItemsPerPage = true,
}) => {
  const colorClasses = {
    blue: "border-blue-600 bg-blue-600 hover:bg-blue-700",
    gray: "border-gray-600 bg-gray-600 hover:bg-gray-700",
  };

  const activeColorClass = colorClasses[color] || colorClasses.blue;

  const perPageOptions = useMemo(
    () =>
      itemsPerPageOptions.map((count) => ({
        label: `${count} per page`,
        value: count,
      })),
    [itemsPerPageOptions],
  );

  if (totalPages <= 1 && !showItemsPerPage) return null;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange?.(page);
  };

  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className={`mt-6 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-full px-3 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>

          {getPages().map((page, index) =>
            page === "..." ? (
              <span key={`dots-${index}`} className="px-2 text-gray-500">
                <MoreHorizontal color="#000000" />
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                aria-current={currentPage === page ? "page" : undefined}
                className={`min-w-9 rounded-full border px-3 py-2 text-sm transition ${
                  currentPage === page
                    ? `${activeColorClass} text-white`
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-full px-3 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {showItemsPerPage && (
          <div className="min-w-37.5">
            <SelectInput
              options={perPageOptions}
              value={itemsPerPage}
              onChange={(nextValue) =>
                onItemsPerPageChange?.(Number(nextValue))
              }
              size="m"
              placeholder="Items per page"
              isClearable={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
