export default function QueryHistory({
  history,
  onSelectQuery,
}: {
  history: string[];
  onSelectQuery: (item: string) => void;
}) {
  return (
    <aside className="bg-gray-900 p-4 rounded-lg w-full sm:w-1/3 sm:sticky sm:top-4">
      <h3 className="text-lg font-bold mb-2">Query History</h3>
      <div className="overflow-y-auto  max-h-[30vh] sm:max-h-[85vh]">
        {history.map((item, index) => (
          <button
            key={index}
            className="block text-blue-400 hover:text-blue-300 cursor-pointer break-words whitespace-normal w-full text-left before:content-['•'] before:mr-2"
            onClick={() => onSelectQuery(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </aside>
  );
}
