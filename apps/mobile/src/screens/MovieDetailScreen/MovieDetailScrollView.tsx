import { FC, Fragment, useCallback } from 'react';
import { RefreshControl, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useMovieDetail } from '@libs/movie-api';
import { GenericError } from '@mobile/components/GenericError';
import { useDelayEnabled } from '@mobile/hooks/useDelayEnabled';

import { BackButton, BackButtonHeight } from '@mobile/components/BackButton';
import { useAnimateScrollViewHeader } from '@mobile/hooks/useAnimateScrollViewHeader';
import { MovieDetailContent } from './MovieDetailContent';

type Props = {
	movieId: string;
};

/**
 * This component is mostly responsible for fetching the movie detail data and passing it to the `MovieDetailContent` component.
 */
export const MovieDetailScrollView: FC<Props> = (props) => {
	const { movieId } = props;

	const { styles, theme } = useStyles(stylesheet);
	const { top, bottom } = useSafeAreaInsets();

	const apiEnabled = useDelayEnabled();
	const { data, isFetching, isError, refetch } = useMovieDetail({ movieId, enabled: apiEnabled });

	const { scrollRef, headerStyle } = useAnimateScrollViewHeader({
		animateDistance: BackButtonHeight,
	});

	const onRefresh = useCallback(() => {
		refetch();
	}, [refetch]);

	return (
		<Fragment>
			<Animated.ScrollView
				ref={scrollRef}
				refreshControl={
					<RefreshControl
						refreshing={isFetching}
						onRefresh={onRefresh}
						tintColor={theme.colors.typography}
						progressViewOffset={top}
					/>
				}>
				{isError ? (
					<SafeAreaView>
						<GenericError />
					</SafeAreaView>
				) : data ? (
					<MovieDetailContent movieDetail={data} />
				) : null}

				<View style={{ height: bottom }} />
			</Animated.ScrollView>

			<Animated.View style={[styles.header, headerStyle]}>
				<BackButton />
			</Animated.View>
		</Fragment>
	);
};

const stylesheet = createStyleSheet((theme, rt) => ({
	header: {
		position: 'absolute',
		left: theme.margins.xl,
		paddingTop: rt.insets.top,
	},
}));
