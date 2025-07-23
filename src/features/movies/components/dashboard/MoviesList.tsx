import { Link } from "react-router-dom";
import type { Movie } from "../../../../types/types";

interface MoviesListProps {
  movies: Movie[];
  onDelete: (id: number) => void;
}

export default function MoviesList({ movies, onDelete }: MoviesListProps) {
  return (
    <div className="p-4">
      <ul className="divide-y divide-gray-200">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <Link
              to={`/movies/${movie.id}`}
              className="font-medium hover:underline transition-colors duration-300 ease-in-out cursor-pointer"
            >
              {movie.title} ({movie.year})
            </Link>

            <div className="flex gap-2 mt-2 sm:mt-0">
              <Link
                to={`/movies/edit/${movie.id}`}
                className="inline-flex py-2 px-3 items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 ease-in-out cursor-pointer"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(movie.id)}
                className="inline-flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center transition-colors duration-300 ease-in-out cursor-pointer"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
