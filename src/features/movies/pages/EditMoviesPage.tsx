import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetMovieQuery, useUpdateMovieMutation } from "../moviesApi";
import Wrapper from "../../../shared/components/layouts/Wrapper";

export default function EditMoviePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, isLoading } = useGetMovieQuery(Number(id));
  const [updateMovie, { isLoading: isUpdating }] = useUpdateMovieMutation();

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [format, setFormat] = useState('');
  const [actors, setActors] = useState<string>('');

  useEffect(() => {
    if (movie && movie.data) {
      const m = movie.data;
      setTitle(m.title);
      setYear(m.year.toString());
      setFormat(m.format);
      setActors(m.actors.map((actor: { name: string }) => actor.name).join(", "));
    }
  }, [movie]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMovie({
        id: Number(id),
        data: {
          title,
          year: Number(year),
          format: format as 'VHS' | 'DVD' | 'Blu-ray',
          actors: actors.split(",").map(actor => actor.trim()),
        },
      }).unwrap();
      navigate("/movies");
    } catch {
      alert("Failed to update movie");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Link
              to="/movies"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 transition-colors duration-300 ease-in-out"
            >
              Back to Movies
            </Link>
            <h2 className="mb-4 text-xl font-bold text-gray-900">Edit Movie</h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />  
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Year</label>
                <input
                  type="number"
                  placeholder="Year"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />  
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Format</label>
                <select
                  value={format}
                  onChange={e => setFormat(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                >
                  <option value="">Select format</option>
                  <option value="VHS">VHS</option>
                  <option value="DVD">DVD</option>
                  <option value="Blu-ray">Blu-ray</option>
                </select>  
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Actors (comma separated)</label>
                <textarea
                  placeholder="Actors list"
                  rows={8}
                  value={actors}
                  onChange={e => setActors(e.target.value)}
                  className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  required
                />  
              </div>
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out cursor-pointer"
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
