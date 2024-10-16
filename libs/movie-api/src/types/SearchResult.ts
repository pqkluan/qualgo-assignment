/**
 * Cleaned up movie data, ready to be displayed in the UI.
 */
export type SearchResult = {
	movieId: string;
	title: string;
	posterUrl?: string;
	posterWidth?: number;
	posterHeight?: number;
};
