import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { decode } from 'html-entities';

import { MovieDetail } from '../types';
import { imdbApi } from '../imdb-api';
import { queryKeys } from '../query-key-factory';
import { POSTER_RATIO } from '../constants';

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
			const result = await imdbApi.getMovieDetail({ movieId });

			return {
				movieId,
				title: decode(result.short.name),
				actors: result.short.actor.map((actor) => decode(actor.name)).filter(Boolean),
				description: decode(result.short.description),
				keywords: decode(result.short.keywords).split(',').filter(Boolean),
				posterUrl: result.short.image,
				posterRatio: POSTER_RATIO,
				reviews: result.top.featuredReviews.edges.map<MovieDetail['reviews'][0]>((edge) => ({
					summary: decode(edge.node.summary.originalText),
					author: edge.node.author.nickName,
					plainText: decode(edge.node.text.originalText.plainText),
					rating: edge.node.authorRating,
					date: edge.node.submissionDate,
				})),
			};
		},
		enabled: !!movieId,
		...otherConfig,
	});
};
