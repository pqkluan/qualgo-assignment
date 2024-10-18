import { FC } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import FastImage from 'react-native-fast-image';

type FastImageProps = React.ComponentProps<typeof FastImage>;
type ExtendedProps = Omit<FastImageProps, 'source'>;

type Props = {
	uri: string;
} & ExtendedProps;

export const MoviePoster: FC<Props> = (props) => {
	const { uri, style, ...otherProps } = props;

	const { styles } = useStyles(stylesheet);

	return (
		<FastImage
			source={{
				uri,
				priority: FastImage.priority.high,
				cache: FastImage.cacheControl.immutable,
			}}
			style={[styles.poster, style]}
			resizeMode={FastImage.resizeMode.cover}
			{...otherProps}
		/>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	poster: {
		borderColor: theme.colors.typography,
	},
}));
