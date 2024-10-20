import { useRef, useState } from 'react';

import { useDidMount } from './useDidMount';

/**
 * Workaround for this issue: https://github.com/facebook/react-native/issues/35779
 * TL;DR: iOS indicator don't work properly when the refresh control is enabled at the start, so we need to add a delay
 *
 * @param delay
 * @returns
 */
export const useDelayEnabled = (delay = 10) => {
	const timerRef = useRef<NodeJS.Timeout>(null);
	const [enabled, setEnabled] = useState(false);

	useDidMount(() => {
		timerRef.current = setTimeout(() => {
			setEnabled(true);
			timerRef.current = null;
		}, delay);
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	});

	return enabled;
};
