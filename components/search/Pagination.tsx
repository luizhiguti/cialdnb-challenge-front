export default function Pagination({
  page,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: {
  page: number;
  pageSize: number;
  totalPages: number;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="flex items-center">
        <label htmlFor="pageSize" className="mr-2 text-sm">
          Items per page
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(+e.target.value)}
          className="border px-2 py-1 rounded text-sm bg-white dark:bg-gray-800"
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center sm:justify-start gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="md:mr-2 px-2 py-1 bg-blue-400 hover:text-blue-300 rounded disabled:opacity-50 disabled:cursor-default disabled:hover:text-inherit cursor-pointer text-sm"
        >
          Prev
        </button>
        <div className="hidden sm:block">
          {page} of {totalPages}
        </div>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="md:ml-2 px-2 py-1 bg-blue-400 hover:text-blue-300 rounded disabled:opacity-50 disabled:cursor-default disabled:hover:text-inherit cursor-pointer text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
