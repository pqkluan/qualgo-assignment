import { FC, useCallback, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ScreenWrap } from '@mobile/components/ScreenWrap';
import { SearchBar } from '@mobile/components/SearchBar';
import { ScreenProps } from '@mobile/navigation/types/ScreenProps';

import { SearchResultList } from './SearchResultList';

type Props = ScreenProps<'SearchScreen'>;

export const SearchScreen: FC<Props> = (props) => {
	const { navigation } = props;

	const { styles } = useStyles(stylesheet);

	const [searchString, setSearchString] = useState('');

	const handleSearchCancel = useCallback(() => {
		navigation.pop();
	}, [navigation]);

	const handleItemPress = useCallback(
		(movieId: string) => {
			navigation.navigate('MovieDetailScreen', { movieId });
		},
		[navigation],
	);

	return (
		<ScreenWrap testID='search-screen' safeBottom={false}>
			<SearchBar
				placeholder={'Movie title'}
				containerStyle={styles.searchBar}
				value={searchString}
				onChangeText={setSearchString}
				onCancel={handleSearchCancel}
				cancellable
				autoFocus
			/>

			<SearchResultList searchKeyword={searchString} onItemPress={handleItemPress} />
		</ScreenWrap>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	searchBar: {
		marginVertical: theme.margins.md,
	},
}));
