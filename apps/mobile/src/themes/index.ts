import { colors } from './colors';

const margins = {
	xs: 2,
	sm: 4,
	md: 8,
	lg: 12,
	xl: 16,
} as const;

const radius = {
	xs: 4,
	sm: 8,
	md: 16,
} as const;

export const lightTheme = {
	statusBarStyle: 'dark-content',
	colors: {
		background: colors.white,
		card: colors.whiteSmoke,
		typography: colors.black,
		typographySecondary: colors.darkGray,
		error: colors.red,
		border: colors.darkGray,
		notification: colors.red,
	},
	margins,
	radius,
	isDark: false,
} as const;

export const darkTheme = {
	statusBarStyle: 'light-content',
	colors: {
		background: colors.eerieBlack,
		card: colors.charlestonGreen,
		typography: colors.whiteSmoke,
		typographySecondary: colors.darkGray,
		error: colors.red,
		border: colors.darkGray,
		notification: colors.red,
	},
	margins,
	radius,
	isDark: true,
} as const;
