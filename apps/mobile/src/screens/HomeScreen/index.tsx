import { FC, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ScreenWrap } from '@mobile/components/ScreenWrap';
import { SearchBar } from '@mobile/components/SearchBar';
import { ScreenProps } from '@mobile/navigation/types/ScreenProps';

import { RandomMovieList } from './RandomMovieList';

type Props = ScreenProps<'HomeScreen'>;

export const HomeScreen: FC<Props> = (props) => {
	const { navigation } = props;

	const { styles } = useStyles(stylesheet);

	// TODO: make search hidden and show it when user scrolls up

	const handleSearchPress = useCallback(() => {
		navigation.navigate('SearchScreen');
	}, [navigation]);

	const handleItemPress = useCallback(
		(movieId: string) => {
			navigation.navigate('MovieDetailScreen', { movieId });
		},
		[navigation],
	);

	return (
		<ScreenWrap testID='home-screen' safeBottom={false}>
			<TouchableOpacity testID='search-button' onPress={handleSearchPress}>
				<View pointerEvents={'none'}>
					<SearchBar containerStyle={styles.searchBar} placeholder='Search for a movie...' />
				</View>
			</TouchableOpacity>

			<RandomMovieList onItemPress={handleItemPress} />
		</ScreenWrap>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	searchBar: {
		marginVertical: theme.margins.md,
	},
}));
