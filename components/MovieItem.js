import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import FadeIn from "../animations/FadeIn";
import {getImageFromApi} from "../API/TMDBApi";

export default class MovieItem extends React.Component {

    _displayFavoriteImage() {
        if (this.props.isFavorite) {
            return (
                <Image
                    source = {require ('../assets/ic_favorite.png')}
                    style = {styles.favoriteImage}
                />
            )
        }
    }

    render() {
        const {movie, displayMovieDetail} = this.props;

        return (
            <FadeIn>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={ () => displayMovieDetail(movie.id) }>
                    {this._displayFavoriteImage()}
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(movie.poster_path)}}
                    />
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            <Text style={styles.title_text}>{movie.title}</Text>
                            <Text style={styles.vote_text}>{movie.vote_average}</Text>
                        </View>
                        <View style={styles.description_container}>
                            <Text style={styles.description_text} numberOfLines={6}>{movie.overview}</Text>
                        </View>
                        <View style={styles.date_container}>
                            <Text style={styles.date_text}>Sortie le {movie.release_date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row',
        padding: 5,
    },
    image: {
        width: 120,
        height: 180,
        marginRight: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    favoriteImage: {
        position: 'absolute',
        zIndex: 1,
        left: 96,
        top: 156,
        width: 30,
        height: 30,
        backgroundColor: '#f2f2f2'
    }
})