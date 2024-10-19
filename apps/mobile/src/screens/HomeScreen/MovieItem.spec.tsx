/* eslint-disable @nx/enforce-module-boundaries */
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Movie } from '../../../../../libs/movie-api/src';

import { MovieItem } from './MovieItem';

describe('MovieItem', () => {
	const movie: Movie = {
		movieId: 'tt123456',
		title: 'Movie Title',
		posterRatio: 0.5,
		posterUrl: 'https://example.com/poster.jpg',
	};

	it('renders correct contents', () => {
		const view = render(<MovieItem item={movie} onPress={jest.fn()} />);
		expect(view.getByTestId('movie-poster')).toBeDefined();
		expect(view.getByText(movie.title)).toBeDefined();
	});

	it('calls onPress with movieId when click on the movie item', () => {
		const mockedOnPress = jest.fn();
		const view = render(<MovieItem item={movie} onPress={mockedOnPress} />);

		fireEvent.press(view.getByTestId('movie-poster'));
		expect(mockedOnPress).toHaveBeenCalledWith(movie.movieId);
	});
});
