// FIXME: update this type to match the API response
export type Movie = {
	movieId: string;
	title: string;

	alias: string;
	year: number;
	rank: number;

	posterUrl?: string;
	posterWidth?: number;
	posterHeight?: number;

	actors: string;
};
