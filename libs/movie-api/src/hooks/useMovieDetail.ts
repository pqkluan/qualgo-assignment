import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { MovieDetail } from '../types';
import { queryKeys } from '../query-key-factory';
import { movieApi } from '..';

type Params = Omit<
	UndefinedInitialDataOptions<MovieDetail, Error, MovieDetail, string[]>,
	'queryKey' | 'queryFn'
> & {
	movieId: string;
};

/**
 * Get details movie data by movieId
 *
 * @param params - Params for useQuery hook
 * @param params.movieId movieId to get details
 *
 * @returns The movie details
 */
export const useMovieDetail = (params: Params) => {
	const { movieId, ...otherConfig } = params;

	return useQuery({
		queryKey: queryKeys.movieDetail(movieId),
		queryFn: async () => {
			const result = await movieApi.getMovieDetail({ movieId });

			return {
				movieId,
				title: result.short.name,
				actors: result.short.actor.map((actor) => actor.name),
				description: result.short.description,
				keywords: result.short.keywords.split(','),
				posterUrl: result.short.image,
				reviews: result.top.featuredReviews.edges.map<MovieDetail['reviews'][0]>((edge) => ({
					author: edge.node.author.nickName,
					plainText: edge.node.text.originalText.plainText,
					rating: edge.node.authorRating,
					date: edge.node.submissionDate,
				})),
			};
		},
		enabled: !!movieId,
		...otherConfig,
	});
};
