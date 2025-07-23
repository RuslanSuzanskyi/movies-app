import { Link } from "react-router-dom";

export default function MoviesHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <h1 className="text-2xl font-bold text-gray-900">Movies List</h1>
      <div className="flex gap-2">
        <Link
          to="/movies/add"
          className="inline-flex py-2 px-3 items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 ease-in-out cursor-pointer"
        >
          Add Movie
        </Link>
        <Link
          to="/movies/import"
          className="inline-flex py-2 px-3 items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 ease-in-out cursor-pointer"
        >
          Import Movies
        </Link>
      </div>
    </div>
  );
};
