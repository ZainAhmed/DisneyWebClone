export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TvShow = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  origin_country: Array<string>;
  original_name: string;
  name: string;
};

export type SearchResults = {
  page: number;
  results: Movie[] | TvShow[];
  total_pages: number;
  total_results: number;
};
export type Genre = {
  id: number;
  name: string;
};

export type Genres = {
  genres: Genre[];
};
