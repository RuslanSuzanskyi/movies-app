import { useState } from "react";
import MoviesHeader from "./MoviesHeader";
import MoviesList from "./MoviesList";
import MoviesSearch from "./MoviesSearch";
import { useDeleteMovieMutation, useGetMoviesQuery } from "../../moviesApi";

export default function MoviesDashboard() {
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [searchActor, setSearchActor] = useState<string>('');
  const { data, isLoading, error, refetch } = useGetMoviesQuery({
    title: searchTitle,
    actor: searchActor,
    sort: 'title',
    order: 'ASC',
  });
  const [deleteMovie] = useDeleteMovieMutation();

  const movies = data?.data ?? [];

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      await deleteMovie(id);
      refetch();
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
        <MoviesHeader />
        <MoviesSearch
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          searchActor={searchActor}
          setSearchActor={setSearchActor}
          onSearch={refetch}
        />

        {isLoading && (
          <p className="text-gray-500 p-4">Loading...</p>
        )}

        {error && (
          <p className="text-red-500 p-4">Failed to load movies.</p>
        )}

        {!isLoading && !error && movies.length === 0 && (
          <p className="text-gray-500 p-4">No movies found.</p>
        )}

        {!isLoading && !error && movies.length > 0 && (
          <MoviesList movies={movies} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

