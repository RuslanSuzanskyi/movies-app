import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const LoginForm = lazy(() => import('../features/auth/components/LoginForm'));
const RegisterForm = lazy(() => import('../features/auth/components/RegisterForm'));
const MoviesPage = lazy(() => import('../features/movies/pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../features/movies/pages/MovieDetailsPage'));
const AddMoviePage = lazy(() => import('../features/movies/pages/AddMoviePage'));
const ImportMoviesPage = lazy(() => import('../features/movies/pages/ImportMoviesPage'));
const EditMoviePage = lazy(() => import('../features/movies/pages/EditMoviesPage'));

import PrivateRoute from './PrivateRoute';

export const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route element={<PrivateRoute />}>
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/movies/edit/:id" element={<EditMoviePage />} />
        <Route path="/movies/add" element={<AddMoviePage />} />
        <Route path="/movies/import" element={<ImportMoviesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/movies" replace />} />
    </Routes>
  </Suspense>
);
