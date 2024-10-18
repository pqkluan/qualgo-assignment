import React, { FC } from 'react';

import {
	createNativeStackNavigator,
	NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { HomeScreen } from '@mobile/screens/HomeScreen';
import { SearchScreen } from '@mobile/screens/SearchScreen';
import { MovieDetailScreen } from '@mobile/screens/MovieDetailScreen';

import { RootStackParamList } from './types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const stackScreenOptions: NativeStackNavigationOptions = {
	fullScreenGestureEnabled: true,
	gestureEnabled: true,
	headerShown: false,
	animation: 'slide_from_right',
};

const fadeAnimation: NativeStackNavigationOptions = {
	animation: 'fade',
};

export const RootStackNavigator: FC = () => {
	return (
		<Stack.Navigator screenOptions={stackScreenOptions}>
			<Stack.Screen name='HomeScreen' component={HomeScreen} />
			<Stack.Screen name='SearchScreen' component={SearchScreen} options={fadeAnimation} />
			<Stack.Screen name='MovieDetailScreen' component={MovieDetailScreen} />
		</Stack.Navigator>
	);
};
