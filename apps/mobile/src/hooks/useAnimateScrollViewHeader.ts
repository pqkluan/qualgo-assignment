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
	const scrollOffset = useScrollViewOffset(scrollRef);

	const lastOffset = useSharedValue(0);
	const lastDerivedValue = useSharedValue(0);
	const lastMinOffSet = useSharedValue(0);
	const lastMaxOffSet = useSharedValue(animateDistance);

	const offsetDistance = useDerivedValue(() => {
		const diff = scrollOffset.value - lastOffset.value;

		if (diff === 0) {
			// Case 1: The new offset is the same as the last offset for some reason
			// Just return the last derived value
			return lastDerivedValue.value;
		}

		if (diff > 0) {
			// Case 2: Scrolling down

			// Update the max offset if user scroll past it
			if (scrollOffset.value > lastMaxOffSet.value) {
				// Max offset need to be at least the animate distance
				lastMaxOffSet.value = Math.max(scrollOffset.value, animateDistance);
				// We also need to drag the min offset along with the new max offset
				lastMinOffSet.value = Math.max(scrollOffset.value - animateDistance, 0);
			}
		} else if (diff < 0) {
			// Case 3: Scrolling up

			// Update the min offset if the current offset is less than the last min offset
			if (scrollOffset.value < lastMinOffSet.value) {
				// Limit the min offset to be at least at 0
				lastMinOffSet.value = Math.max(scrollOffset.value, 0);
				// Update the max offset after the min offset
				lastMaxOffSet.value = Math.max(lastMinOffSet.value + animateDistance, animateDistance);
			}
		}

		// Calculate the amount of distance from the current offset to the last min offset
		// Also limit the derived value to be between 0 and animate distance
		lastDerivedValue.value = clamp(scrollOffset.value - lastMinOffSet.value, 0, animateDistance);

		// Always update the last offset at the end
		lastOffset.value = scrollOffset.value;

		return lastDerivedValue.value;
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
