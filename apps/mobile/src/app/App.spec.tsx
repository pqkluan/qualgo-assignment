import React from 'react';
import { render } from '@testing-library/react-native';

import { App } from './App';

jest.mock('../screens/HomeScreen');

describe('App', () => {
	beforeEach(() => {
		jest.spyOn(console, 'log').mockImplementation(() => undefined);
	});

	it('renders HomeScreen by default', () => {
		const view = render(<App />);
		expect(view.getByTestId('home-screen')).toBeDefined();
	});

	it('log info when navigation is ready', () => {
		render(<App />);
		expect(console.log).toHaveBeenCalledWith('Navigation is ready');
	});
});
