"use client";
import { useEffect, useState } from "react";

export default function SearchBar({
  query,
  onSearch,
}: {
  query: string;
  onSearch: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col sm:flex-row items-center gap-x-2"
    >
      <input
        className="border p-2 rounded w-full sm:w-2/3 mb-2 sm:mb-0"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter search query..."
      />
      <button
        type="submit"
        className="bg-blue-600 disabled:opacity-50 disabled:cursor-default text-white px-4 py-2 rounded cursor-pointer w-full sm:w-auto"
        disabled={!inputValue}
      >
        Search
      </button>
    </form>
  );
}
