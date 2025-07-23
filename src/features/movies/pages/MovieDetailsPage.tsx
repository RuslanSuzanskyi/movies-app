import { Link, useParams } from "react-router-dom";
import { useGetMovieQuery } from "../moviesApi";
import Wrapper from "../../../shared/components/layouts/Wrapper";

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const { data, isLoading, error } = useGetMovieQuery(movieId);

  if (isLoading) {
    return (
      <Wrapper>
        <div className="text-gray-500 p-4">Loading...</div>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <div className="text-red-500 p-4">Failed to load movie details.</div>
      </Wrapper>
    );
  }

  if (!data || !data.data) {
    return (
      <Wrapper>
        <div className="text-gray-500 p-4">Movie not found.</div>
      </Wrapper>
    );
  }

  const movie = data.data;

  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900">{movie.title}</h1>
            <Link
              to="/movies"
              className="inline-flex items-center text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 transition-colors duration-300 ease-in-out px-4 py-2"
            >
              Back to Movies
            </Link>
          </div>
          <div className="p-4 space-y-2">
            <p className="text-gray-700">
              <strong className="font-semibold">Year:</strong> {movie.year}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Format:</strong> {movie.format}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Actors:</strong>{" "}
              {Array.isArray(movie.actors) && movie.actors.length > 0
                ? movie.actors.map((actor: { name: any }) => actor.name).join(", ")
                : "No actors listed"}
            </p>
          </div>
          <div className="flex justify-end gap-2 p-4 border-t">
            <Link
              to={`/movies/edit/${movie.id}`}
              className="inline-flex py-2 px-3 items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 ease-in-out cursor-pointer"
            >
              Edit Movie
            </Link>
            <Link
              to="/movies"
              className="inline-flex items-center text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 transition-colors duration-300 ease-in-out px-4 py-2"
            >
              Back
            </Link>
          </div>
        </div>
      </div>  
    </Wrapper>
    
  );
};
