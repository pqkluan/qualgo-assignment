import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen } from './index';

jest.mock('./RandomMovieList');

const wrapper = ({ children }: { children: React.ReactNode }) => {
	return <NavigationContainer>{children}</NavigationContainer>;
};

describe('HomeScreen', () => {
	const navigation = { navigate: jest.fn() };

	beforeEach(() => {
		navigation.navigate.mockReset();
	});

	it('renders correct contents', () => {
		const view = render(<HomeScreen navigation={navigation} />, { wrapper });
		expect(view.getByTestId('home-screen')).toBeDefined();
		expect(view.getByTestId('search-button')).toBeDefined();
		expect(view.getByTestId('random-movie-list')).toBeDefined();
	});

	it('open search screen when click on the search ui', () => {
		const view = render(<HomeScreen navigation={navigation} />, { wrapper });
		expect(view.getByTestId('search-button')).toBeDefined();
		fireEvent.press(view.getByTestId('search-button'));
		expect(navigation.navigate).toHaveBeenCalledWith('SearchScreen');
	});

	it('open movie detail when click on the list item', () => {
		const view = render(<HomeScreen navigation={navigation} />, { wrapper });

		const randomMovieList = view.getByTestId('random-movie-list');
		expect(randomMovieList).toBeDefined();

		const onItemPress = randomMovieList.props['onItemPress'] as (movieId: string) => void;
		expect(typeof onItemPress).toBe('function');

		onItemPress('tt123456');
		expect(navigation.navigate).toHaveBeenCalledWith('MovieDetailScreen', { movieId: 'tt123456' });
	});
});
