import { NavigationContainer } from '@react-navigation/native';
import React, { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export const NavigationProvider: FC<Props> = (props) => {
	const { children } = props;

	return <NavigationContainer onReady={onReady}>{children}</NavigationContainer>;
};

const onReady = () => {
	console.log('Navigation is ready');
};
