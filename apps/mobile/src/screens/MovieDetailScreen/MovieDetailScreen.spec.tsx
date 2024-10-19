import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { MovieDetailScreen } from './index';

jest.mock('./MovieDetailScrollView');

const wrapper = ({ children }: { children: React.ReactNode }) => {
	return <NavigationContainer>{children}</NavigationContainer>;
};

describe('MovieDetailScreen', () => {
	const navigation = { goBack: jest.fn() };
	const route = { params: { movieId: 'tt123456' } };

	beforeEach(() => {
		navigation.goBack.mockReset();
	});

	it('renders correct contents', () => {
		const view = render(<MovieDetailScreen navigation={navigation} route={route} />, { wrapper });
		expect(view.getByTestId('movie-detail-screen')).toBeDefined();
		expect(view.getByTestId('movie-detail-scroll-view')).toBeDefined();
		expect(view.getByTestId('movie-detail-scroll-view').props['movieId']).toBe('tt123456');
	});

	it('should go back if movie ID is missing', () => {
		const emptyRoute = { params: {} };
		render(<MovieDetailScreen navigation={navigation} route={emptyRoute} />, { wrapper });
		expect(navigation.goBack).toHaveBeenCalled();
	});
});
