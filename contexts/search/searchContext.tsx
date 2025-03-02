"use client";
import { SearchResult } from "@/core/types/duck-duck-go/search-response";
import { createContext, useContext, useReducer, useEffect } from "react";

interface SearchState {
  query: string;
  response: SearchResult[];
  history: string[];
  pagination: {
    items: SearchResult[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  };
  status: "idle" | "loading" | "failed";
}

const initialState: SearchState = {
  query: "",
  response: [],
  history: [],
  pagination: {
    items: [],
    pageNumber: 1,
    pageSize: 5,
    totalPages: 1,
  },
  status: "idle",
};

export type Action =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_PAGE_SIZE"; payload: number }
  | { type: "SET_PAGE_ITEMS"; payload: SearchResult[] }
  | { type: "SET_TOTAL_PAGES"; payload: number }
  | { type: "SET_RESULTS"; payload: SearchResult[] }
  | { type: "SET_STATUS"; payload: "idle" | "loading" | "failed" }
  | { type: "SET_HISTORY"; payload: string[] };

const searchReducer = (state: SearchState, action: Action): SearchState => {
  switch (action.type) {
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
        history: [action.payload, ...state.history],
      };
    case "SET_PAGE":
      return {
        ...state,
        pagination: { ...state.pagination, pageNumber: action.payload },
      };
    case "SET_PAGE_SIZE":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pageNumber: 1,
          pageSize: action.payload,
        },
      };
    case "SET_PAGE_ITEMS":
      return {
        ...state,
        pagination: { ...state.pagination, items: action.payload },
      };
    case "SET_TOTAL_PAGES":
      return {
        ...state,
        pagination: { ...state.pagination, totalPages: action.payload },
      };
    case "SET_RESULTS":
      return { ...state, response: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_HISTORY":
      return { ...state, history: action.payload };

    default:
      return state;
  }
};

const SearchContext = createContext<
  { state: SearchState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  useEffect(() => {
    const fetchResults = async () => {
      if (!state.query) return;
      dispatch({ type: "SET_STATUS", payload: "loading" });

      try {
        const params = new URLSearchParams({
          query: state.query,
        });
        const apiURL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(
          `${apiURL}/duckduckgo/search?${params.toString()}`
        );
        const data: SearchResult[] = await response.json();

        dispatch({ type: "SET_RESULTS", payload: data });
        dispatch({ type: "SET_STATUS", payload: "idle" });
      } catch {
        dispatch({ type: "SET_STATUS", payload: "failed" });
      }
    };

    fetchResults();
  }, [state.query]);

  useEffect(() => {
    const start = (state.pagination.pageNumber - 1) * state.pagination.pageSize;
    const end = start + state.pagination.pageSize;
    const paginated = state.response.slice(start, end);
    const totalPages =
      Math.floor(state.response.length / state.pagination.pageSize) || 1;
    dispatch({ type: "SET_TOTAL_PAGES", payload: totalPages });
    dispatch({ type: "SET_PAGE_ITEMS", payload: paginated });
  }, [state.response, state.pagination.pageNumber, state.pagination.pageSize]);

  useEffect(() => {
    const fetchResults = async () => {
      const apiURL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiURL}/query-history/all`);
      const data: { query: string }[] = await response.json();
      dispatch({ type: "SET_HISTORY", payload: data.map((q) => q.query) });
    };

    fetchResults();
  }, []);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook personalizado
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
