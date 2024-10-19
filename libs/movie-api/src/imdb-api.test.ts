import { imdbApi as api } from './imdb-api';

describe('API', () => {
	beforeEach(() => {
		global.fetch = jest
			.fn()
			.mockImplementation(() => Promise.resolve({ json: () => Promise.resolve({}) }));
	});

	it('searchMovies', async () => {
		await api.searchMovies({ searchQuery: 'Sherlock' });

		expect(global.fetch).toHaveBeenCalledWith(
			'https://imdb.iamidiotareyoutoo.com/search?q=Sherlock',
			{ method: 'GET' },
		);
	});

	it('getMovieDetail', async () => {
		await api.getMovieDetail({ movieId: 'tt123456' });
		expect(global.fetch).toHaveBeenCalledWith(
			'https://imdb.iamidiotareyoutoo.com/search?tt=tt123456',
			{ method: 'GET' },
		);
	});
});
