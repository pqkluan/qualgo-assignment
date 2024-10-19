import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { BackButton } from './BackButton';

const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
	useNavigation: () => ({ goBack: mockedGoBack }),
}));

describe('BackButton', () => {
	it('match snapshot', () => {
		const view = render(<BackButton />);
		expect(view).toMatchSnapshot();
	});

	it('renders button icon', () => {
		const view = render(<BackButton />);

		expect(view.getByTestId('chevron-left-icon')).toBeDefined();
	});

	it('trigger navigation.goBack upon press by default', () => {
		mockedGoBack.mockClear();

		const view = render(<BackButton />);
		fireEvent.press(view.getByTestId('back-button'));

		expect(mockedGoBack).toHaveBeenCalledTimes(1);
	});

	it('trigger onPress props upon press', () => {
		const onPress = jest.fn();

		const view = render(<BackButton onPress={onPress} />);
		fireEvent.press(view.getByTestId('back-button'));

		expect(onPress).toHaveBeenCalledTimes(1);
	});
});
