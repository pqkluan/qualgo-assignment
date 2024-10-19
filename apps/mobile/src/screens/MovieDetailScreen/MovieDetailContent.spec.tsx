/* eslint-disable @nx/enforce-module-boundaries */
import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { MovieDetail } from '../../../../../libs/movie-api/src';

import { MovieDetailContent } from './MovieDetailContent';

const wrapper = ({ children }: { children: React.ReactNode }) => {
	return <NavigationContainer>{children}</NavigationContainer>;
};

describe('MovieDetailScreen', () => {
	it('renders correct contents', () => {
		const movieDetail: MovieDetail = {
			movieId: 'tt123456',
			posterUrl: 'https://example.com/poster.jpg',
			posterRatio: 1,
			title: 'Movie title',
			actors: ['actor1', 'actor2'],
			keywords: ['keyword1', 'keyword2'],
			description: 'Movie description',
			reviews: [
				{
					author: 'author1',
					summary: 'Review summary 1',
					plainText: 'Review content 1',
					date: '2021-01-01',
					rating: 2,
				},
				{
					author: 'author2',
					summary: 'Review summary 2',
					plainText: 'Review content 2',
					date: '2021-02-01',
					rating: 3,
				},
			],
		};

		const view = render(<MovieDetailContent movieDetail={movieDetail} />, { wrapper });

		expect(view.getByTestId('movie-poster')).toBeDefined();
		expect(view.getByText('Movie title')).toBeDefined();
		expect(view.getByText('Movie description')).toBeDefined();

		expect(view.getByText('actor1')).toBeDefined();
		expect(view.getByText('actor2')).toBeDefined();

		expect(view.getByText('keyword1')).toBeDefined();
		expect(view.getByText('keyword2')).toBeDefined();

		// Review 1
		expect(view.getByText('author1')).toBeDefined();
		expect(view.getByText('Review summary 1')).toBeDefined();
		expect(view.getByText('Review content 1')).toBeDefined();
		expect(view.getByText('January 01, 2021')).toBeDefined();
		expect(view.getByText('2')).toBeDefined();

		// Review 2
		expect(view.getByText('author2')).toBeDefined();
		expect(view.getByText('Review summary 2')).toBeDefined();
		expect(view.getByText('Review content 2')).toBeDefined();
		expect(view.getByText('February 01, 2021')).toBeDefined();
		expect(view.getByText('3')).toBeDefined();
	});

	it('renders empty contents', () => {
		const movieDetail: MovieDetail = {
			movieId: 'tt123456',
			posterUrl: 'https://example.com/poster.jpg',
			posterRatio: 1,
			title: 'Movie title',
			actors: [],
			keywords: [],
			description: '',
			reviews: [],
		};

		const view = render(<MovieDetailContent movieDetail={movieDetail} />, { wrapper });

		expect(view.getByTestId('movie-poster')).toBeDefined();
		expect(view.getByText('Movie title')).toBeDefined();
		expect(view.getByText('There is no actors information')).toBeDefined();
		expect(view.getByText('This movie contains no keyword')).toBeDefined();
		expect(view.getByText("This movie don't have description")).toBeDefined();
		expect(view.getByText('There is no reviews for this movie')).toBeDefined();
	});
});
