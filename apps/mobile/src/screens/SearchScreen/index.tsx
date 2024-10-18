import { FC, useCallback, useState } from 'react';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ScreenWrap } from '@mobile/components/ScreenWrap';
import { SearchBar } from '@mobile/components/SearchBar';
import { useAnimateScrollViewHeader } from '@mobile/hooks/useAnimateScrollViewHeader';
import { ScreenProps } from '@mobile/navigation/types/ScreenProps';

import { SearchResultList } from './SearchResultList';

// Search bar height + top margin + bottom margin
const SearchBarHeight = 30 + 8 + 12;

type Props = ScreenProps<'SearchScreen'>;

export const SearchScreen: FC<Props> = (props) => {
	const { navigation } = props;

	const { styles } = useStyles(stylesheet);
	const { top } = useSafeAreaInsets();

	const [searchString, setSearchString] = useState('');

	const handleSearchCancel = useCallback(() => {
		navigation.pop();
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
		<ScreenWrap testID='search-screen' safeTop={false} safeBottom={false}>
			<SearchResultList
				flatListRef={flatListRef}
				searchKeyword={searchString}
				headerTopPadding={top + SearchBarHeight}
				onItemPress={handleItemPress}
			/>

			<Animated.View style={[styles.animatedSearchBar, headerStyle]}>
				<SearchBar
					placeholder={'Movie title'}
					containerStyle={styles.searchBar}
					value={searchString}
					onChangeText={setSearchString}
					onCancel={handleSearchCancel}
					cancellable
					autoFocus
				/>
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
		marginVertical: theme.margins.md,
	},
}));
