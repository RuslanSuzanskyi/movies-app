import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCreateMovieMutation } from '../moviesApi';
import Wrapper from '../../../shared/components/layouts/Wrapper';

export default function AddMoviePage() {
  const MIN_YEAR = 1850;
  const MAX_YEAR = 2021;

  const [title, setTitle] = useState<string>('');
  const [year, setYear] = useState<number>(MAX_YEAR);
  const [format, setFormat] = useState<'VHS' | 'DVD' | 'Blu-ray'>('DVD');
  const [actors, setActors] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [createMovie, { isLoading }] = useCreateMovieMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setErrorMessage('Movie title cannot be empty or just spaces.');
      return;
    }

    if (year < MIN_YEAR || year > MAX_YEAR) {
      setErrorMessage(`Year must be between ${MIN_YEAR} and ${MAX_YEAR}.`);
      return;
    };

    const actorList = actors
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const actorRegex = /^[a-zA-Z\s\-.']+$/;

    for (const actor of actorList) {
      if (!actorRegex.test(actor)) {
        setErrorMessage("Actor names can only contain letters, spaces, hyphens (-), dots (.), and apostrophes (').");
        return;
      }
    };

    if (actorList.length === 0) {
      setErrorMessage('Please enter at least one actor.');
      return;
    };

    try {
      await createMovie({
        title: trimmedTitle,
        year,
        format,
        actors: actorList,
      }).unwrap();

      setSuccessMessage('Movie created successfully!');
      setTitle('');
      setYear(MAX_YEAR);
      setFormat('DVD');
      setActors('');
    } catch (error: any) {
      console.error('Error creating movie:', error);
      if (error.data && error.data.message && error.data.message.includes('already exists')) {
        setErrorMessage('The movie with this title already exists.');
      } else {
        setErrorMessage('Failed to create movie. Please check your data and try again.');
      }
    };
  };

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
            <h2 className="mb-4 text-xl font-bold text-gray-900">Add New Movie</h2>

            {errorMessage && (
              <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  min={MIN_YEAR}
                  max={MAX_YEAR}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">Year must be between {MIN_YEAR} and {MAX_YEAR}.</p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as 'VHS' | 'DVD' | 'Blu-ray')}
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
                  onChange={(e) => setActors(e.target.value)}
                  className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out cursor-pointer"
              >
                {isLoading ? 'Adding...' : 'Add Movie'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};