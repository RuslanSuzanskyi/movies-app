import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CreateMovieRequest, MovieDetails, MoviesResponse } from '../../types/types';
import type { RootState } from '../../app/store';

const apiUrl = (window as any).API_URL || "http://localhost:8000/api/v1";

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/sessions',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<void, { email: string; name: string; password: string; confirmPassword: string }>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),

    getMovies: builder.query<MoviesResponse, { title?: string; actor?: string; sort?: string; order?: string }>({
      query: ({ title, actor, sort = 'title', order = 'ASC' }) => {
        const params = new URLSearchParams();

        if (title) params.append('title', title);
        if (actor) params.append('actor', actor);
        params.append('sort', sort);
        params.append('order', order);
        params.append('limit', '999999');

        return `/movies?${params.toString()}`;
      },
      providesTags: ['Movies'],
    }),
    getMovie: builder.query<MovieDetails, number>({
      query: (id) => `/movies/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Movies', id }],
    }),
    createMovie: builder.mutation<MovieDetails, CreateMovieRequest>({
      query: (body) => ({
        url: '/movies',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Movies'],
    }),
    deleteMovie: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/movies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Movies'],
    }),
    updateMovie: builder.mutation<MovieDetails, { id: number; data: Partial<CreateMovieRequest> }>({
      query: ({ id, data }) => ({
        url: `/movies/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Movies', id: arg.id },
        'Movies',
      ],
    }),
    importMovies: builder.mutation<MoviesResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append('movies', file);
        return {
          url: '/movies/import',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Movies'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMoviesQuery,
  useGetMovieQuery,
  useCreateMovieMutation,
  useDeleteMovieMutation,
  useUpdateMovieMutation,
  useImportMoviesMutation,
} = moviesApi;
