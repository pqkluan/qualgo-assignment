import { Platform } from 'react-native';

import { colors } from './colors';

const fontFamily = Platform.select({
	// These are the default fonts for Android and iOS, respectively.
	// You can change them to any other font you like, once the fonts asset has been linked.
	android: 'Roboto',
	ios: 'San Francisco',
});

export const lightTheme = {
	statusBarStyle: 'dark-content',
	colors: {
		background: colors.white,
		typography: colors.black,
		typographySecondary: colors.darkGray,
		error: colors.red,
		border: colors.darkGray,
		notification: colors.red,
	},
	margins: {
		xs: 2,
		sm: 4,
		md: 8,
		lg: 12,
		xl: 16,
	},
	radius: {
		sm: 8,
		md: 16,
	},
	fontFamily,
	isDark: false,
} as const;

export const darkTheme = {
	statusBarStyle: 'light-content',
	colors: {
		background: colors.black,
		typography: colors.whiteSmoke,
		typographySecondary: colors.darkGray,
		error: colors.red,
		border: colors.darkGray,
		notification: colors.red,
	},
	margins: {
		xs: 2,
		sm: 4,
		md: 8,
		lg: 12,
		xl: 16,
	},
	radius: {
		sm: 8,
		md: 16,
	},
	fontFamily,
	isDark: true,
} as const;
