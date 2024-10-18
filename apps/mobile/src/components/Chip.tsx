import { FC } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@mobile/components/Text';

type Props = {
	text: string;
};

export const Chip: FC<Props> = (props) => {
	const { text } = props;

	const { styles } = useStyles(stylesheet);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	container: {
		backgroundColor: theme.colors.typography,
		paddingHorizontal: theme.margins.sm,
		paddingVertical: theme.margins.xs,
		borderRadius: theme.radius.xs,
	},
	text: {
		color: theme.colors.background,
	},
}));
