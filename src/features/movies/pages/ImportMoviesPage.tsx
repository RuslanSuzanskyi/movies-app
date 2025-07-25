import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useImportMoviesMutation } from '../moviesApi';
import Wrapper from '../../../shared/components/layouts/Wrapper';

export default function ImportMoviesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [importMovies, { isLoading }] = useImportMoviesMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setSuccessMessage('');
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile && selectedFile.size === 0) {
      setErrorMessage('The file is empty.');
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    if (!file) {
      setErrorMessage('Please select a file to import.');
      return;
    }

    if (file.size === 0) {
      setErrorMessage('The file is empty.');
      return;
    };

    try {
      await importMovies(file).unwrap();
      setSuccessMessage('Movies imported successfully!');
      setFile(null);
    } catch (error: any) {
      console.error('Error importing movies:', error);
      if (error.data && error.data.message) {
        setErrorMessage(`Failed to import movies: ${error.data.message}`);
      } else {
        setErrorMessage('Failed to import movies. Please check the file format and try again.');
      }
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center mx-auto h-screen px-4">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-6 sm:p-8">
            <Link
              to="/movies"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 transition-colors duration-300 ease-in-out"
            >
              Back to Movies
            </Link>

            <h2 className="mb-4 text-xl font-bold text-gray-900">Import Movies</h2>

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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="file-upload"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload .txt file
                </label>

                <div
                  className="flex items-center justify-center w-full"
                >
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4-4l-4 4m0 0l4 4m-4-4h12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">.txt file only</p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".txt"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                </div>

                {file && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: <span className="font-medium">{file.name}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!file || isLoading || !!errorMessage}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out"
              >
                {isLoading ? 'Importing...' : 'Import Movies'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}