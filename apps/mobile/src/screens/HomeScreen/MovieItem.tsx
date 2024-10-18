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

export const MovieItem: FC<Props> = (props) => {
	const { item, onPress } = props;
	const { movieId, title, posterUrl, posterRatio } = item;

	const { styles } = useStyles(stylesheet);

	return (
		<TouchableOpacity onPress={() => onPress(movieId)} activeOpacity={0.9}>
			<MoviePoster uri={posterUrl} style={[styles.poster, { aspectRatio: 1 / posterRatio }]} />

			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	poster: {
		width: '100%',
		borderRadius: theme.radius.md,
		borderWidth: 3.2,
	},
	title: {
		marginTop: theme.margins.md,
		color: theme.colors.typography,
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 16,
	},
}));
