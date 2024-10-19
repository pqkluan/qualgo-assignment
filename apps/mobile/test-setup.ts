import '@testing-library/jest-native/extend-expect';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

import './src/app/setup/setupTheme';

require('react-native-reanimated').setUpTests();
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
