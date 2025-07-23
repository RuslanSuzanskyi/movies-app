import { Link, useParams } from "react-router-dom";
import { useGetMovieQuery } from "../moviesApi";
import Wrapper from "../../../shared/components/layouts/Wrapper";

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const { data, isLoading, error } = useGetMovieQuery(movieId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load movie details.</p>;
  if (!data || !data.data) return <p>Movie not found.</p>;

  const movie = data.data;

  return (
    <Wrapper>
      <Link
        to="/movies"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 transition-colors duration-300 ease-in-out"
      >
        Back to Movies
      </Link>
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Format:</strong> {movie.format}</p>
      <p>
        <strong>Actors:</strong>{" "}
        {Array.isArray(movie.actors) && movie.actors.length > 0
          ? movie.actors.map((actor: { name: any; }) => actor.name).join(", ")
          : "No actors listed"}
      </p>
      <Link
        to="/movies"
        className="mt-4 inline-block bg-gray-600 text-white px-4 py-2 rounded"
      >
        Back to Movies
      </Link>
    </Wrapper>
  );
}
