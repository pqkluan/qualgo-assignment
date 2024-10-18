import { UnistylesRegistry } from 'react-native-unistyles';

import { breakpoints } from '@mobile/themes/breakpoints';
import { lightTheme as light, darkTheme as dark } from '@mobile/themes';

/**
 * For more config options, see the reference:
 * https://reactnativeunistyles.vercel.app/reference/unistyles-registry/
 */
UnistylesRegistry.addBreakpoints(breakpoints).addThemes({ light, dark }).addConfig({
	adaptiveThemes: true,
	initialTheme: 'dark',
});
