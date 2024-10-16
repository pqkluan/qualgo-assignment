import { FC, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ScreenProps } from '@mobile/navigation/types/ScreenProps';
import { movieApi, SearchResult } from '@libs/movie-api';
import { useDidMount } from '@mobile/hooks/useDidMount';

type Props = ScreenProps<'HomeScreen'>;

export const HomeScreen: FC<Props> = (props) => {
	const { navigation } = props;

	const [movies, setMovies] = useState<SearchResult[]>([]);

	useDidMount(() => {
		async function fetchData() {
			// FIXME: how to get the random search query?
			const keyword = 'gun';

			const result = await movieApi.searchMovies({ searchQuery: keyword });
			const data = result.description.slice(0, 10).map<SearchResult>((item) => {
				return {
					movieId: item['#IMDB_ID'],
					title: item['#TITLE'],
					posterUrl: item['#IMG_POSTER'],
					posterHeight: item['#IMG_POSTER_HEIGHT'],
					posterWidth: item['#IMG_POSTER_WIDTH'],
				};
			});

			setMovies(data);
		}

		fetchData();
	});

	return (
		<View style={styles.container}>
			<Button title='Search' onPress={() => navigation.navigate('SearchScreen')} />
			<Button
				title='Open movie details'
				onPress={() => navigation.navigate('MovieDetailScreen', { movieId: 'tt1745960' })}
			/>

			<ScrollView>
				{movies.map((movie) => {
					const { movieId, title, posterUrl } = movie;

					// FIXME: move this to it own component

					return (
						<TouchableOpacity
							key={movieId}
							onPress={() => navigation.navigate('MovieDetailScreen', { movieId })}>
							{!!posterUrl && (
								<Image
									source={{ uri: posterUrl }}
									style={{
										width: '100%',
										aspectRatio: 1,
									}}
									resizeMethod='resize'
									resizeMode='cover'
								/>
							)}

							<Text>{title}</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});
