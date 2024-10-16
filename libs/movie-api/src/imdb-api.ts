import { IMDbDetailResponse } from './types/IMDbDetailResponse';
import { IMDbSearchResponse } from './types/IMDbSearchResponse';

const EndPoint = 'https://imdb.iamidiotareyoutoo.com' as const;

export const imdbApi = {
	searchMovies: async (params: { searchQuery: string }): Promise<IMDbSearchResponse> => {
		const { searchQuery } = params;

		const searchParams = new URLSearchParams({ q: searchQuery });
		const url = `${EndPoint}/search?${searchParams.toString()}`;

		const response = await fetch(url, { method: 'GET' });
		const result = await response.json();
		return result as IMDbSearchResponse;
	},
	getMovieDetail: async (params: { movieId: string }): Promise<IMDbDetailResponse> => {
		const { movieId } = params;

		const searchParams = new URLSearchParams({ tt: movieId });
		const url = `${EndPoint}/search?${searchParams.toString()}`;

		const response = await fetch(url, { method: 'GET' });
		const result = await response.json();
		return result as IMDbDetailResponse;
	},
};
