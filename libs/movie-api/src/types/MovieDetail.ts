/**
 * Movie data for detail display.
 */
export type MovieDetail = {
	movieId: string;

	title: string;
	description: string;
	posterUrl: string;
	posterRatio: number;
	actors: string[];
	keywords: string[];
	reviews: Review[];
};

type Review = {
	summary: string;
	author: string;
	plainText: string;
	rating: number;
	date: string;
};
