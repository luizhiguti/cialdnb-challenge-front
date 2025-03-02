"use client";
import Pagination from "@/components/search/Pagination";
import QueryHistory from "@/components/search/QueryHistory";
import ResultsList from "@/components/search/ResultsList";
import SearchBar from "@/components/search/SearchBar";
import { useSearch } from "@/contexts/search/searchContext";

export default function SearchApp() {
  const { state, dispatch } = useSearch();

  return (
    <div className="flex flex-col sm:flex-row min-h-screen p-4 gap-4">
      <QueryHistory
        history={state.history}
        onSelectQuery={(q) => dispatch({ type: "SET_QUERY", payload: q })}
      />
      <main className="flex-1">
        <SearchBar
          query={state.query}
          onSearch={(q) => dispatch({ type: "SET_QUERY", payload: q })}
        />
        <ResultsList results={state.pagination.items} query={state.query} />
        <Pagination
          page={state.pagination.pageNumber}
          pageSize={state.pagination.pageSize}
          totalPages={state.pagination.totalPages}
          onPageSizeChange={(pageSize) =>
            dispatch({ type: "SET_PAGE_SIZE", payload: pageSize })
          }
          onPageChange={(newPage) =>
            dispatch({ type: "SET_PAGE", payload: newPage })
          }
        />
      </main>
    </div>
  );
}
