import Animated, {
	AnimatedRef,
	clamp,
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useDerivedValue,
	useScrollViewOffset,
	useSharedValue,
} from 'react-native-reanimated';

type Params = { animateDistance: number };

/**
 * Animate the header of a scroll view when user scroll up or down
 * @returns {scrollRef, headerStyle} - Pass the scrollRef to the Animated.[ScrollView|FlatList] component and the headerStyle to the Animated.View component
 */
export const useAnimateScrollViewHeader = (params: Params) => {
	const { animateDistance } = params;

	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef.current ? scrollRef : null);

	const lastOffset = useSharedValue(0);
	const lastOffsetDistance = useSharedValue(0);
	const lastMinOffSet = useSharedValue(0);
	const lastMaxOffSet = useSharedValue(animateDistance);

	const offsetDistance = useDerivedValue(() => {
		const diff = scrollOffset.value - lastOffset.value;

		if (diff > 0) {
			// Case 1: Scrolling down

			// Update the max offset if user scroll down past it
			if (scrollOffset.value > lastMaxOffSet.value) {
				// Max offset need to be at least the animate distance
				const maxOffset = Math.max(scrollOffset.value, animateDistance);
				if (lastMaxOffSet.value !== maxOffset) lastMaxOffSet.value = maxOffset;

				// We also need to pull the min offset along with the new max offset
				const minOffset = Math.max(scrollOffset.value - animateDistance, 0);
				if (lastMinOffSet.value !== minOffset) lastMinOffSet.value = minOffset;
			}
		} else if (diff < 0) {
			// Case 2: Scrolling up

			// Update the min offset if user scroll up past it
			if (scrollOffset.value < lastMinOffSet.value) {
				// Limit the min offset to be at least at 0
				const minOffset = Math.max(scrollOffset.value, 0);
				if (lastMinOffSet.value !== minOffset) lastMinOffSet.value = minOffset;

				// We also need to lower the max offset along with the new min offset
				const maxOffset = Math.max(lastMinOffSet.value + animateDistance, animateDistance);
				if (lastMaxOffSet.value !== maxOffset) lastMaxOffSet.value = maxOffset;
			}
		}

		if (diff === 0) {
			// Case 3: The new offset is the same as the last offset for some reason
			// Just return the last derived value
			return lastOffsetDistance.value;
		}

		// Calculate the amount of distance from the current offset to the last min offset
		// Also limit the derived value to be between 0 and animate distance
		const nextOffsetDistance = clamp(scrollOffset.value - lastMinOffSet.value, 0, animateDistance);
		if (lastOffsetDistance.value !== nextOffsetDistance)
			lastOffsetDistance.value = nextOffsetDistance;

		// Update the last offset at the end
		lastOffset.value = scrollOffset.value;

		return nextOffsetDistance;
	});

	const headerStyle = useAnimatedStyle(() => ({
		top: -offsetDistance.value * 0.5,
		opacity: interpolate(offsetDistance.value, [0, animateDistance], [1, 0]),
	}));

	return {
		/**
		 * Pass this ref to the Animated.ScrollView component
		 */
		scrollRef,

		/**
		 * Pass this ref to the Animated.FlatList component
		 */
		flatListRef: scrollRef as unknown as AnimatedRef<Animated.FlatList<unknown>>,

		/**
		 * Pass this style to the Animated.View component
		 */
		headerStyle,
	};
};
