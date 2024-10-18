import { FC, Fragment } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Chip } from '@mobile/components/Chip';
import { MovieDetail } from '@libs/movie-api';
import { MoviePoster } from '@mobile/components/MoviePoster';
import { Text } from '@mobile/components/Text';

import { UserReview } from './UserReview';

type Props = {
	movieDetail: MovieDetail;
};

export const MovieDetailContent: FC<Props> = (props) => {
	const { movieDetail } = props;
	const { title, posterUrl, posterRatio, actors, keywords, description, reviews } = movieDetail;

	const { styles } = useStyles(stylesheet);

	return (
		<Fragment>
			<MoviePoster uri={posterUrl} style={[styles.poster, { aspectRatio: 1 / posterRatio }]} />

			<View style={styles.subContainer}>
				<Text style={styles.title}>{title}</Text>

				<Text style={styles.sectionLabel}>{'Actors'}</Text>
				{Array.isArray(actors) && actors.length > 0 ? (
					<View style={styles.chipsRow}>
						{actors.map((actor) => (
							<Chip key={actor} text={actor} />
						))}
					</View>
				) : (
					<Text style={styles.emptyText}>{'There is no actors information'}</Text>
				)}

				<Text style={styles.sectionLabel}>{'Keywords'}</Text>
				{Array.isArray(keywords) && keywords.length > 0 ? (
					<View style={styles.chipsRow}>
						{keywords.map((keyword) => (
							<Chip key={keyword} text={keyword} />
						))}
					</View>
				) : (
					<Text style={styles.emptyText}>{'This movie contains no keyword'}</Text>
				)}

				<Text style={styles.sectionLabel}>{'Description'}</Text>
				{typeof description === 'string' && description.length > 0 ? (
					<Text style={styles.description}>{description}</Text>
				) : (
					<Text style={styles.emptyText}>{"This movie don't have description"}</Text>
				)}

				<Text style={styles.sectionLabel}>{'Reviews'}</Text>
				{Array.isArray(reviews) && reviews.length > 0 ? (
					reviews.map((review) => <UserReview key={review.date + review.author} review={review} />)
				) : (
					<Text style={styles.emptyText}>{'There is no reviews for this movie'}</Text>
				)}
			</View>
		</Fragment>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	poster: {
		borderRadius: 0,
		width: '100%',
	},
	subContainer: {
		marginTop: theme.margins.lg,
		marginHorizontal: theme.margins.xl,
		gap: theme.margins.lg,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
	},
	sectionLabel: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	chipsRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',

		gap: theme.margins.md,
	},
	description: {
		fontSize: 13,
	},
	emptyText: {
		fontStyle: 'italic',
	},
}));
