/**
 * Movie data for detail display.
 */
export type MovieDetail = {
	movieId: string;

	title: string;
	description: string;
	posterUrl: string;
	actors: string[];
	keywords: string[];
	reviews: Review[];
};

type Review = {
	author: string;
	plainText: string;
	rating: number;
	date: string;
};
