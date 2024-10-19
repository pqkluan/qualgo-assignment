/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
import React from 'react';
import { act, render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import * as Hook from '../../../../../libs/movie-api/src/hooks/useMovieDetail';

import { MovieDetailScrollView } from './MovieDetailScrollView';

jest.mock('./MovieDetailContent');

const wrapper = ({ children }: { children: React.ReactNode }) => {
	return <NavigationContainer>{children}</NavigationContainer>;
};

describe('MovieDetailScrollView', () => {
	const movieId = 'tt123456';
	const mockData = { value: 'this is a mock data' };

	const mockReturnValue = {
		data: mockData,
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
		jest.spyOn(Hook, 'useMovieDetail').mockReturnValue(mockReturnValue as any);

		const view = render(<MovieDetailScrollView movieId={movieId} />, {
			wrapper,
		});
		act(() => jest.advanceTimersToNextTimer());

		expect(view.getByTestId('back-button')).toBeDefined();
		expect(view.getByTestId('movie-detail-scroll-view')).toBeDefined();
		expect(view.getByTestId('movie-detail-content')).toBeDefined();
		expect(view.getByTestId('movie-detail-content').props['movieDetail']).toBe(mockData);
	});

	it('renders error', () => {
		jest
			.spyOn(Hook, 'useMovieDetail')
			.mockReturnValue({ ...mockReturnValue, isError: true } as any);

		const view = render(<MovieDetailScrollView movieId={movieId} />, {
			wrapper,
		});
		act(() => jest.advanceTimersToNextTimer());

		expect(view.getByTestId('generic-error-text')).toBeDefined();
	});
});
