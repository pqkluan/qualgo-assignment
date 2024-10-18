import { FC } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from './Text';

/**
 * Generic component to display a message when a list is empty
 */
export const EmptyList: FC = () => {
	const { styles } = useStyles(stylesheet);

	return (
		<View style={styles.container}>
			<Text textAlign='center'>{'No search results found'}</Text>;
		</View>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	container: {
		marginTop: theme.margins.xl,

		justifyContent: 'center',
		alignItems: 'center',
	},
}));
