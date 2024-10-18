import { useCallback, useMemo, useState } from 'react';
import { UndefinedInitialDataOptions } from '@tanstack/react-query';

import { Movie } from '../types';
import { useSearchMovie } from './useSearchMovie';

type Params = Omit<
	UndefinedInitialDataOptions<Movie[], Error, Movie[], string[]>,
	'queryKey' | 'queryFn'
> & {
	limit?: number;
};

/**
 * Get random movies
 *
 * @param params - Params for useQuery hook
 * @param params.limit limit of movies to get, default to 10
 *
 * @returns The prettied search results
 */
export const useRandomMovies = (params?: Params) => {
	const { limit = 10, ...otherConfig } = params ?? {};

	const [keyword, setKeyword] = useState(getRandomKeyword);

	const { data, refetch, ...others } = useSearchMovie({ keyword, ...otherConfig });

	const limitedData = useMemo(() => data?.slice(0, limit), [data, limit]);

	const reseedAndRefetch = useCallback(() => {
		setKeyword(getRandomKeyword);
		refetch();
	}, [refetch]);

	return { data: limitedData, refetch: reseedAndRefetch, ...others };
};

const getRandomKeyword = () => {
	const keywords = [
		'Action',
		'Adventure',
		'Animation',
		'Biography',
		'Comedy',
		'Crime',
		'Drama',
		'Family',
		'Fantasy',
		'History',
		'Horror',
		'Music',
		'Musical',
		'Mystery',
		'Sci-Fi',
		'Sport',
		'Thriller',
		'War',
		'Western',
	];

	const randomIndex = Math.floor(Math.random() * keywords.length);

	return keywords[randomIndex];
};
