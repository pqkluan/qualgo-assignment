import './setup';

import { QueryClientProvider } from '@tanstack/react-query';

import { NavigationProvider } from '@mobile/navigation/NavigationProvider';
import { RootStackNavigator } from '@mobile/navigation/RootStackNavigator';

import { queryClient } from './queryClient';

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<NavigationProvider>
				<RootStackNavigator />
			</NavigationProvider>
		</QueryClientProvider>
	);
};
