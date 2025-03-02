import { SearchResult } from "@/core/types/duck-duck-go/search-response";

export default function ResultsList({
  results,
  query,
}: {
  results: SearchResult[];
  query: string;
}) {
  const highlightText = (text: string, term: string) => {
    if (!term) return { text, count: 0 };
    const regex = new RegExp(term, "gi");
    return {
      count: text.match(regex)?.length ?? 0,
      text: text.replace(
        regex,
        (match) =>
          `<span class='bg-yellow-400 text-gray-800 rounded'>${match}</span>`
      ),
    };
  };

  return (
    <ul className="mt-4">
      {results.length > 0 ? (
        results.map((item, index) => {
          const { text: _text, count } = highlightText(item.title, query);
          return (
            <li key={index} className="mb-2">
              <a
                href={item.url}
                target="_blank"
                className="text-blue-400 underline"
                dangerouslySetInnerHTML={{
                  __html: _text,
                }}
              />
              <p className="text-sm text-gray-600">Matches found: {count}</p>
            </li>
          );
        })
      ) : (
        <li className="text-blue-400">No results</li>
      )}
    </ul>
  );
}
