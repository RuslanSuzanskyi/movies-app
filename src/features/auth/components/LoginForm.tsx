import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooks';
import { useLoginMutation } from '../../movies/moviesApi';
import { setToken } from '../authSlice';
import Wrapper from '../../../shared/components/layouts/Wrapper';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setToken(result.token));
      navigate('/movies');
    } catch (err: any) {
      console.error('Login failed:', err);

      if (err.data && err.data.message) {
        const backendMessage = err.data.message.toLowerCase(); // Convert message to lowercase for easier comparison

        if (backendMessage.includes('invalid password') || backendMessage.includes('wrong password')) {
          setErrorMessage('Incorrect password. Please try again.'); // Specific message for wrong password
        } else if (backendMessage.includes('user not found') ||
                   backendMessage.includes('no user with this email')) {
          setErrorMessage('No user found with this email. Please check your email or register an account.');
        } else if (backendMessage.includes('invalid credentials')) {
          setErrorMessage('Invalid credentials. Please check your email and password.');
        } else {
          setErrorMessage(`Login failed: ${err.data.message}`);
        }
      } else if (err.status === 'FETCH_ERROR' || err.error === 'FetchError' || err.message === 'Network Error') {
        setErrorMessage('Could not connect to the server. Please check your internet connection or try again later.');
      } else {
        setErrorMessage('Login failed. An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              <div className="mb-8">
                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out cursor-pointer"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

              {errorMessage && (
                <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                  {errorMessage}
                </div>
              )}
              <p className="text-sm font-light text-gray-500">
                Don't have an account yet?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:underline transition-colors duration-300 ease-in-out cursor-pointer">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};