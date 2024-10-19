/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { act, render } from '@testing-library/react-native';
import React from 'react';

import * as Hook from '../../../../../libs/movie-api/src/hooks/useRandomMovies';
import { queryClient } from '../../app/queryClient';

import { RandomMovieList } from './RandomMovieList';

const wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>{children}</NavigationContainer>
		</QueryClientProvider>
	);
};

describe('RandomMovieList', () => {
	const props = { headerTopPadding: 16, onItemPress: jest.fn() };
	const mockReturnValue = {
		data: [
			{
				movieId: 'tt001',
				title: 'Movie Title 1',
				posterRatio: 1,
				posterUrl: 'https://example.com/poster-1.jpg',
			},
			{
				movieId: 'tt002',
				title: 'Movie Title 2',
				posterRatio: 1,
				posterUrl: 'https://example.com/poster-2.jpg',
			},
		],
		isLoading: false,
		isError: false,
		isFetched: true,
		refetch: jest.fn(),
	};

	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('renders correct contents', () => {
		jest.spyOn(Hook, 'useRandomMovies').mockReturnValue({ ...mockReturnValue, data: [] } as any);

		const view = render(<RandomMovieList {...props} />, { wrapper });
		act(() => jest.advanceTimersToNextTimer());

		expect(view.getByTestId('movie-list')).toBeDefined();
	});

	it('renders list items', () => {
		jest.spyOn(Hook, 'useRandomMovies').mockReturnValue(mockReturnValue as any);

		const view = render(<RandomMovieList {...props} />, { wrapper });
		act(() => jest.advanceTimersToNextTimer());

		expect(view.getByText('Movie Title 1')).toBeDefined();
		expect(view.getByText('Movie Title 2')).toBeDefined();
	});

	it('renders error', () => {
		jest
			.spyOn(Hook, 'useRandomMovies')
			.mockReturnValue({ ...mockReturnValue, isError: true } as any);

		const view = render(<RandomMovieList {...props} />, { wrapper });
		act(() => jest.advanceTimersToNextTimer());

		expect(view.getByTestId('generic-error-text')).toBeDefined();
	});
});
