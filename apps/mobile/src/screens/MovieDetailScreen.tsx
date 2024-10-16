import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenProps } from '@mobile/navigation/types/ScreenProps';
import { useDidMount } from '@mobile/hooks/useDidMount';

type Props = ScreenProps<'MovieDetailScreen'>;

export const MovieDetailScreen: FC<Props> = (props) => {
	const { route, navigation } = props;
	const { params } = route;

	useDidMount(() => {
		if (typeof params?.movieId !== 'undefined') return;
		// Missing important data, pop by default
		navigation.goBack();
	});

	return (
		<View style={styles.container}>
			<Text>{`Post info of ${route.params.movieId}`}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
