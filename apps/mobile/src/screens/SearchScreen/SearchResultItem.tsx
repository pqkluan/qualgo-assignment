import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Movie } from '@libs/movie-api';
import { Text } from '@mobile/components/Text';
import { MoviePoster } from '@mobile/components/MoviePoster';

type Props = {
	item: Movie;
	onPress: (movieId: string) => void;
};

export const SearchResultItem: FC<Props> = (props) => {
	const { item, onPress } = props;
	const { movieId, title, posterUrl, posterRatio } = item;

	const { styles } = useStyles(stylesheet);

	return (
		<TouchableOpacity style={styles.container} onPress={() => onPress(movieId)}>
			<MoviePoster uri={posterUrl} style={[styles.thumbnail, { aspectRatio: 1 / posterRatio }]} />

			<Text style={styles.title} numberOfLines={2}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
	},
	thumbnail: {
		width: '100%',
		borderRadius: theme.radius.sm,
		borderWidth: 2.2,
	},
	title: {
		marginTop: theme.margins.sm,
		color: theme.colors.typography,
		fontWeight: 'bold',
		textAlign: 'center',
	},
}));
