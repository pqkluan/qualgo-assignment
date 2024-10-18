import { FC } from 'react';

import { ScreenWrap } from '@mobile/components/ScreenWrap';
import { useDidMount } from '@mobile/hooks/useDidMount';
import { ScreenProps } from '@mobile/navigation/types/ScreenProps';

import { MovieDetailScrollView } from './MovieDetailScrollView';

type Props = ScreenProps<'MovieDetailScreen'>;

export const MovieDetailScreen: FC<Props> = (props) => {
	const { route, navigation } = props;
	const { params } = route;
	const movieId = params?.movieId;

	useDidMount(() => {
		if (typeof movieId !== 'undefined') return;
		// Missing important data, pop by default
		navigation.goBack();
	});

	return (
		<ScreenWrap testID='home-screen' safeTop={false} safeBottom={false}>
			{!!movieId && <MovieDetailScrollView movieId={movieId} />}
		</ScreenWrap>
	);
};
