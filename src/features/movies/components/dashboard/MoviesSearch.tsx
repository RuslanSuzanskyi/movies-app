interface MoviesSearchProps {
  searchTitle: string;
  setSearchTitle: (value: string) => void;
  searchActor: string;
  setSearchActor: (value: string) => void;
  onSearch: () => void;
}

export default function MoviesSearch({
  searchTitle,
  setSearchTitle,
  searchActor,
  setSearchActor,
  onSearch,
}: MoviesSearchProps) {
  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="w-full sm:w-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        />
        <input
          type="text"
          placeholder="Search by actor"
          value={searchActor}
          onChange={(e) => setSearchActor(e.target.value)}
          className="w-full sm:w-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        />
        <button
          onClick={onSearch}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-300 ease-in-out cursor-pointer"
        >
          Search
        </button>
      </div>
    </div>
  );
};
