import { FC } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { ScreenProps } from '@mobile/navigation/types/ScreenProps';

type Props = ScreenProps<'HomeScreen'>;

export const HomeScreen: FC<Props> = (props) => {
	const { navigation } = props;

	return (
		<View style={styles.container}>
			<Button title='Search' onPress={() => navigation.navigate('SearchScreen')} />
			<Button
				title='Open movie details'
				onPress={() => navigation.navigate('MovieDetailScreen', { movieId: 'tt1745960' })}
			/>
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
