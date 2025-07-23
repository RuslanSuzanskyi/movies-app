import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooks';
import { useLoginMutation, useRegisterMutation } from '../../movies/moviesApi';
import { setToken } from '../authSlice';
import Wrapper from '../../../shared/components/layouts/Wrapper';

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, { isLoading: isRegistering, error: registerError }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn, error: loginError }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await register({ email, name, password, confirmPassword }).unwrap();
      const result = await login({ email, password }).unwrap();
      dispatch(setToken(result.token));
      navigate('/movies');
    } catch (err) {
      alert('Registration or login failed');
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />  
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />  
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />  
              </div>
              <div className="mb-8">
                <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />  
              </div>
              <button
                type="submit"
                disabled={isRegistering || isLoggingIn}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out cursor-pointer"
              >
                {isRegistering || isLoggingIn ? 'Processing...' : 'Register'}
              </button>

              {(registerError || loginError) && (
                <p className="text-red-600 mt-2">Error occurred during registration or login</p>
              )}

              <p className="text-sm font-light text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:underline transition-colors duration-300 ease-in-out cursor-pointer">
                  Login here
                </Link>
              </p>
            </form>
          </div> 
        </div>  
      </div>
        
    </Wrapper>
    
  );
}
