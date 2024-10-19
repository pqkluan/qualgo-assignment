import { queryKeys } from './query-key-factory';

describe('query-key-factory', () => {
	it('should work as expected', () => {
		expect(queryKeys.all).toEqual(['movie']);
		expect(queryKeys.movieDetail('tt123456')).toEqual(['movie', 'movie', 'tt123456']);
		expect(queryKeys.search('keyword')).toEqual(['movie', 'search', 'keyword']);
	});
});
