export const queryKeys = {
	all: ['movie'] as const,
	search: (keyword: string) => [...queryKeys.all, 'search', keyword],
	movieDetail: (movieId: string) => [...queryKeys.all, 'movie', movieId],
};
