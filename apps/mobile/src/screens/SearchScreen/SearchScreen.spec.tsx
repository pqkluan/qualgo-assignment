import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { SearchScreen } from './index';

jest.mock('./SearchResultList.tsx');

const wrapper = ({ children }: { children: React.ReactNode }) => {
	return <NavigationContainer>{children}</NavigationContainer>;
};

describe('SearchScreen', () => {
	const navigation = { navigate: jest.fn(), goBack: jest.fn() };

	beforeEach(() => {
		navigation.navigate.mockReset();
		navigation.goBack.mockReset();
	});

	it('renders correct contents', () => {
		const view = render(<SearchScreen navigation={navigation} />, { wrapper });

		expect(view.getByTestId('search-screen')).toBeDefined();
		expect(view.getByTestId('search-input')).toBeDefined();
		expect(view.getByText('Cancel')).toBeDefined();
		expect(view.getByTestId('search-result-list')).toBeDefined();
	});

	it('go back to previous screen if user press cancel', () => {
		const view = render(<SearchScreen navigation={navigation} />, { wrapper });

		fireEvent.press(view.getByText('Cancel'));
		expect(navigation.goBack).toHaveBeenCalled();
	});

	it('should pass search keyword to search result list', () => {
		const view = render(<SearchScreen navigation={navigation} />, { wrapper });

		fireEvent.changeText(view.getByTestId('search-input'), 'Sherlock Holmes');

		const searchResultList = view.getByTestId('search-result-list');
		expect(searchResultList.props['searchKeyword']).toBe('Sherlock Holmes');
	});

	it('open movie detail when click on the list item', () => {
		const view = render(<SearchScreen navigation={navigation} />, { wrapper });

		const randomMovieList = view.getByTestId('search-result-list');
		const onItemPress = randomMovieList.props['onItemPress'] as (movieId: string) => void;
		expect(typeof onItemPress).toBe('function');

		onItemPress('tt123456');
		expect(navigation.navigate).toHaveBeenCalledWith('MovieDetailScreen', { movieId: 'tt123456' });
	});
});
