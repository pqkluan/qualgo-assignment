import { UnistylesRegistry } from 'react-native-unistyles';

import { darkTheme as dark, lightTheme as light } from '@mobile/themes';
import { breakpoints } from '@mobile/themes/breakpoints';

/**
 * For more config options, see the reference:
 * https://reactnativeunistyles.vercel.app/reference/unistyles-registry/
 */
UnistylesRegistry.addBreakpoints(breakpoints).addThemes({ light, dark }).addConfig({
	adaptiveThemes: true,
	initialTheme: 'dark',
});
