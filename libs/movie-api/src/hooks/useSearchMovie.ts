import { useDeferredValue } from 'react';
import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { decode } from 'html-entities';

import { imdbApi } from '../imdb-api';
import { IMDbSearchResponse, Movie } from '../types';
import { queryKeys } from '../query-key-factory';
import { POSTER_RATIO } from '../constants';

type Params = Omit<
	UndefinedInitialDataOptions<Movie[], Error, Movie[], string[]>,
	'queryKey' | 'queryFn'
> & {
	keyword: string;
};

type DescriptionWithRequiredPoster = IMDbSearchResponse['description'][0] & {
	'#IMG_POSTER': string;
};

/**
 * Search for movies by keyword
 *
 * @param params - Params for useQuery hook
 * @param params.keyword keyword to search
 *
 * @returns The prettied search results
 */
export const useSearchMovie = (params: Params) => {
	const { keyword, ...otherConfig } = params;

	// Use deferred value to prevent unnecessary re-fetching
	const deferredKeyword = useDeferredValue(keyword);

	return useQuery({
		queryKey: queryKeys.search(deferredKeyword),
		queryFn: async () => {
			const responseBody = await imdbApi.searchMovies({ searchQuery: deferredKeyword });

			// Filter out movies without poster, for the sake of UI consistency
			const data = responseBody.description.filter(
				(data): data is DescriptionWithRequiredPoster => !!data['#IMG_POSTER'],
			);

			const searchResults = data.map<Movie>((data) => ({
				movieId: data['#IMDB_ID'],
				title: decode(data['#TITLE']),
				posterUrl: data['#IMG_POSTER'],
				posterRatio: POSTER_RATIO,
			}));

			return searchResults;
		},
		enabled: !!deferredKeyword,
		...otherConfig,
	});
};
