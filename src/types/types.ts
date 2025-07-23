export interface Movie {
  id: number;
  title: string;
  year: number;
  format: 'VHS' | 'DVD' | 'Blu-ray';
  actors?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export interface MovieDetails {
  data: any;
  id: number;
  title: string;
  year: number;
  format: 'VHS' | 'DVD' | 'Blu-ray';
  actors: Actor[];
  createdAt: string;
  updatedAt: string;
};

export interface MoviesResponse {
  data: Movie[];
  meta: {
    total: number;
  };
  status: number;
};

export interface CreateMovieRequest {
  title: string;
  year: number;
  format: 'VHS' | 'DVD' | 'Blu-ray';
  actors: string[];
};

export interface Actor {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};
