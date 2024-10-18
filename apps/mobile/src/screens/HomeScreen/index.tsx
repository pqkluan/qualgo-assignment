import { FC, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ScreenWrap } from '@mobile/components/ScreenWrap';
import { SearchBar } from '@mobile/components/SearchBar';
import { useAnimateScrollViewHeader } from '@mobile/hooks/useAnimateScrollViewHeader';
import { ScreenProps } from '@mobile/navigation/types/ScreenProps';

import { RandomMovieList } from './RandomMovieList';

// Search bar height + top margin + bottom margin
const SearchBarHeight = 30 + 8 + 12;

type Props = ScreenProps<'HomeScreen'>;

export const HomeScreen: FC<Props> = (props) => {
	const { navigation } = props;

	const { styles } = useStyles(stylesheet);
	const { top } = useSafeAreaInsets();

	const handleSearchPress = useCallback(() => {
		navigation.navigate('SearchScreen');
	}, [navigation]);

	const handleItemPress = useCallback(
		(movieId: string) => {
			navigation.navigate('MovieDetailScreen', { movieId });
		},
		[navigation],
	);

	const { flatListRef, headerStyle } = useAnimateScrollViewHeader({
		animateDistance: SearchBarHeight,
	});

	return (
		<ScreenWrap testID='home-screen' safeTop={false} safeBottom={false}>
			<RandomMovieList
				flatListRef={flatListRef}
				headerTopPadding={top + SearchBarHeight}
				onItemPress={handleItemPress}
			/>

			<Animated.View style={[styles.animatedSearchBar, headerStyle]}>
				<TouchableOpacity testID='search-button' onPress={handleSearchPress}>
					<View pointerEvents={'none'}>
						<SearchBar containerStyle={styles.searchBar} placeholder='Search for a movie...' />
					</View>
				</TouchableOpacity>
			</Animated.View>
		</ScreenWrap>
	);
};

const stylesheet = createStyleSheet((theme, rt) => ({
	animatedSearchBar: {
		position: 'absolute',
		left: 0,
		right: 0,
		backgroundColor: theme.colors.background,

		paddingTop: rt.insets.top,
	},
	searchBar: {
		marginTop: theme.margins.md,
		marginBottom: theme.margins.lg,
	},
}));
