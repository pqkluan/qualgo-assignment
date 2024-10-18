import { FC, Fragment, useCallback, useMemo } from 'react';
import { ListRenderItem, RefreshControl, View } from 'react-native';
import Animated, { AnimatedRef } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Movie, useSearchMovie } from '@libs/movie-api';
import { EmptyList } from '@mobile/components/EmptyList';
import { GenericError } from '@mobile/components/GenericError';

import { SearchResultItem } from './SearchResultItem';

type Props = {
	flatListRef: AnimatedRef<Animated.FlatList<unknown>>;
	searchKeyword: string;
	headerTopPadding: number;
	onItemPress: (username: string) => void;
};

const defaultData: Movie[] = [];
const keyExtractor = (item: Movie) => item.movieId;
const hiddenItemId = 'hidden-item' as const;

export const SearchResultList: FC<Props> = (props) => {
	const { flatListRef, searchKeyword: keyword, headerTopPadding, onItemPress } = props;

	const { styles, theme } = useStyles(stylesheet);

	const {
		data = defaultData,
		isFetching,
		isFetched,
		isError,
		refetch,
	} = useSearchMovie({ keyword });

	const paddedData = useMemo<Movie[]>(() => {
		if (data.length % 2 === 0) return data;
		// Add a dummy item to make the list even in case of odd number of items
		return [...data, { movieId: hiddenItemId, title: '', posterUrl: '', posterRatio: 1 }];
	}, [data]);

	const renderItem = useCallback<ListRenderItem<Movie>>(
		({ item }) => {
			if (item.movieId === hiddenItemId) return <View style={styles.hiddenItem} />;
			return <SearchResultItem item={item} onPress={onItemPress} />;
		},
		[onItemPress, styles.hiddenItem],
	);

	const onRefresh = useCallback(() => {
		refetch();
	}, [refetch]);

	return (
		<Animated.FlatList
			ref={flatListRef}
			testID={'search-result-list'}
			contentContainerStyle={styles.contentContainer}
			columnWrapperStyle={styles.columnWrapper}
			keyExtractor={keyExtractor}
			data={paddedData}
			renderItem={renderItem}
			ListHeaderComponent={
				<Fragment>
					<View style={{ height: headerTopPadding }} />
					{isError ? <GenericError /> : null}
				</Fragment>
			}
			ListEmptyComponent={isFetched ? EmptyList : undefined}
			ListFooterComponent={Footer}
			keyboardShouldPersistTaps={'always'}
			ItemSeparatorComponent={Separator}
			numColumns={2}
			refreshControl={
				<RefreshControl
					refreshing={isFetching}
					onRefresh={onRefresh}
					tintColor={theme.colors.typography}
				/>
			}
		/>
	);
};

const Separator = () => {
	const { theme } = useStyles();
	return <View style={{ height: theme.margins.lg }} />;
};

const Footer: FC = () => {
	const { bottom } = useSafeAreaInsets();
	// This will add the padding to the bottom of the list that equals the safe area inset, or 16 if the inset is smaller (likely to be zero)
	const height = Math.max(bottom, 16);
	return <View style={{ height }} />;
};

const stylesheet = createStyleSheet((theme) => ({
	contentContainer: {
		paddingHorizontal: theme.margins.xl,
	},
	columnWrapper: {
		gap: theme.margins.xl,
	},
	hiddenItem: {
		flex: 1,
	},
}));
