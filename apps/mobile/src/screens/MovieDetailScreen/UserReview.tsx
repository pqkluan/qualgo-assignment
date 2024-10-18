import { FC, useMemo } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { MovieDetail } from '@libs/movie-api';
import StarIcon from '@mobile/assets/icons/review-star.svg';
import { Text } from '@mobile/components/Text';
import { colors } from '@mobile/themes/colors';

type Props = {
	review: MovieDetail['reviews'][0];
};

export const UserReview: FC<Props> = (props) => {
	const { review } = props;
	const { author, date, plainText, rating, summary } = review;

	const { styles, theme } = useStyles(stylesheet);

	const formattedDate = useMemo<string>(
		() =>
			new Date(date).toLocaleDateString('en-US', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			}),
		[date],
	);

	return (
		<View style={styles.container}>
			<View style={styles.ratingRow}>
				<StarIcon style={styles.icon} width={18} height={18} color={colors.californiaGold} />
				<Text>{rating ?? '-'}</Text>
				<Text size={12} color={theme.colors.typographySecondary}>
					{'/10'}
				</Text>
			</View>

			<View>
				<Text weight={'bold'}>{summary}</Text>
				<View style={styles.authorRow}>
					<Text color={colors.cornflowerBlue}>{author}</Text>
					<Text>{formattedDate}</Text>
				</View>
			</View>

			<Text size={13}>{plainText}</Text>
		</View>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	container: {
		paddingVertical: theme.margins.lg,
		paddingHorizontal: theme.margins.xl,

		gap: theme.margins.md,

		backgroundColor: theme.colors.card,

		borderRadius: theme.radius.sm,
	},
	ratingRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
	},
	icon: {
		marginRight: theme.margins.sm,
	},
	authorRow: {
		marginTop: theme.margins.xs,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: theme.margins.xl,
	},
}));
