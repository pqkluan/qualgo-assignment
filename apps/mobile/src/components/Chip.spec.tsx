import React from 'react';
import { render } from '@testing-library/react-native';

import { Chip } from './Chip';

describe('Chip', () => {
	it('renders chip text', () => {
		const view = render(<Chip text={'Hello'} />);

		expect(view.getByText('Hello')).toBeDefined();
	});

	it('match snapshot', () => {
		const view = render(<Chip text={'Hello'} />);
		expect(view).toMatchSnapshot();
	});
});
