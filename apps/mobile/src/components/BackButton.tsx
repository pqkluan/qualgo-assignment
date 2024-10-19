import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import ChevronLeftIcon from '@mobile/assets/icons/chevron-left.svg';

type Props = {
	onPress?: () => void;
};

export const BackButton: FC<Props> = (props) => {
	const { onPress } = props;

	const navigation = useNavigation();

	const { styles, theme } = useStyles(stylesheet);

	return (
		<TouchableOpacity testID='back-button' onPress={onPress ?? navigation.goBack}>
			<View style={styles.backButton}>
				<ChevronLeftIcon
					testID='chevron-left-icon'
					width={20}
					height={20}
					color={theme.colors.background}
				/>
			</View>
		</TouchableOpacity>
	);
};

export const BackButtonHeight = 42;

const stylesheet = createStyleSheet((theme, rt) => ({
	header: {
		position: 'absolute',
		left: theme.margins.xl,
		paddingTop: rt.insets.top,
	},
	backButton: {
		justifyContent: 'center',
		alignItems: 'center',

		height: BackButtonHeight,
		width: BackButtonHeight,
		borderRadius: BackButtonHeight / 2,

		backgroundColor: theme.colors.typography,
	},
}));
