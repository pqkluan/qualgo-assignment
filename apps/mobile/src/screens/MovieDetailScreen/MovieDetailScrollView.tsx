import { FC, useCallback } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { useMovieDetail } from '@libs/movie-api';
import { GenericError } from '@mobile/components/GenericError';
import { useDelayEnabled } from '@mobile/hooks/useDelayEnabled';

import { MovieDetailContent } from './MovieDetailContent';

type Props = {
	movieId: string;
};

/**
 * This component is mostly responsible for fetching the movie detail data and passing it to the `MovieDetailContent` component.
 */
export const MovieDetailScrollView: FC<Props> = (props) => {
	const { movieId } = props;

	const { theme } = useStyles();
	const { top, bottom } = useSafeAreaInsets();

	const apiEnabled = useDelayEnabled();
	const { data, isFetching, isError, refetch } = useMovieDetail({ movieId, enabled: apiEnabled });

	const onRefresh = useCallback(() => {
		refetch();
	}, [refetch]);

	return (
		<ScrollView
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
		</ScrollView>
	);
};
