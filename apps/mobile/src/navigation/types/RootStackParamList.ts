export type RootStackParamList = {
	HomeScreen: undefined;
	SearchScreen: undefined;
	MovieDetailScreen: { movieId: string };
};

/**
 * Specifying default types for useNavigation, Link, ref etc
 * @see https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-link-ref-etc
 */
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNavigation {
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
		interface RootParamList extends RootStackParamList {}
	}
}
