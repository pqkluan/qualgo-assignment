import { FC, Fragment, useCallback } from 'react';
import { ListRenderItem, RefreshControl, View } from 'react-native';
import Animated, { AnimatedRef } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Movie, useRandomMovies } from '@libs/movie-api';
import { EmptyList } from '@mobile/components/EmptyList';
import { GenericError } from '@mobile/components/GenericError';

import { useDelayEnabled } from '@mobile/hooks/useDelayEnabled';

import { MovieItem } from './MovieItem';

// Default data needs to be out of the component to prevent re-creation on each render
const defaultData: Movie[] = [];

const keyExtractor = (item: Movie) => item.movieId;

type Props = {
	flatListRef: AnimatedRef<Animated.FlatList<unknown>>;
	headerTopPadding: number;
	onItemPress: (movieId: string) => void;
};

export const RandomMovieList: FC<Props> = (props) => {
	const { flatListRef, headerTopPadding, onItemPress } = props;

	const { styles, theme } = useStyles(stylesheet);

	const apiEnabled = useDelayEnabled();
	const {
		data = defaultData,
		isLoading,
		isFetched,
		isError,
		refetch,
	} = useRandomMovies({ enabled: apiEnabled });

	const renderItem = useCallback<ListRenderItem<Movie>>(
		({ item }) => <MovieItem item={item} onPress={onItemPress} />,
		[onItemPress],
	);

	return (
		<Animated.FlatList
			ref={flatListRef}
			testID='movie-list'
			contentContainerStyle={styles.container}
			keyExtractor={keyExtractor}
			data={data}
			renderItem={renderItem}
			ListHeaderComponent={
				<Fragment>
					<View style={{ height: headerTopPadding }} />
					{isError ? <GenericError /> : null}
				</Fragment>
			}
			ListEmptyComponent={isFetched ? EmptyList : undefined}
			ListFooterComponent={Footer}
			ItemSeparatorComponent={Separator}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={16}
			refreshControl={
				<RefreshControl
					refreshing={isLoading}
					onRefresh={refetch}
					tintColor={theme.colors.typography}
				/>
			}
		/>
	);
};

const Separator = () => {
	const { theme } = useStyles();
	return <View style={{ height: theme.margins.xl }} />;
};

const Footer: FC = () => {
	const { bottom } = useSafeAreaInsets();
	// This will add the padding to the bottom of the list that equals the safe area inset, or 16 if the inset is smaller (likely to be zero)
	const height = Math.max(bottom, 16);
	return <View style={{ height }} />;
};

const stylesheet = createStyleSheet((theme) => ({
	container: {
		paddingHorizontal: theme.margins.xl,
	},
}));
