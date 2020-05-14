import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, Linking, TouchableOpacity} from 'react-native'
import {getMovieDetailFromApi, getImageFromApi} from "../API/TMDBApi";
import moment from "moment";
import numeral from 'numeral'
import {connect} from 'react-redux'

/**
 * MOVIE DETAILS COMPONENT
 */
class MovieDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        getMovieDetailFromApi(this.props.navigation.getParam('movieID')).then( (data) => {
                this.setState({
                    movie: data,
                    isLoading: false
                })
            }
        )
    }

    _toggleFavorite() {
        const action = {
            type: 'TOGGLE_FAVORITE',
            value: this.state.movie
        }
        this.props.dispatch(action)
    }


    _displayFavoriteImage(){
        const isFavorite = this.props.favoriteMovie.findIndex(item => item.id === this.state.movie.id) !==-1
        let sourceImg = isFavorite ? require('../assets/ic_favorite.png') : require('../assets/ic_favorite_border.png')
        return (
            <Image
                style={styles.favoriteImage}
                source={sourceImg}
            />
        )
    }

    render() {
        const movie = this.state.movie
        console.log(movie)

        return (
            <View style={styles.mainContainer}>
                {this.state.isLoading ?
                    /* LOADING INDICATOR */
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' />
                    </View>
                    :
                    /* MOVIE CONTENT */
                    <ScrollView>
                        <Image
                            source={{ uri: getImageFromApi(movie.backdrop_path) }}
                            style={styles.image}
                        />
                        <Text style={styles.title}>{movie.title}</Text>
                        <Text style={styles.subtitle}>{movie.tagline}</Text>
                        <TouchableOpacity
                            style={styles.favoriteContainer}
                            onPress={ () => { this._toggleFavorite() } }>
                            {this._displayFavoriteImage()}
                        </TouchableOpacity>
                        <Text style={styles.overview}>{movie.overview}</Text>
                        <Text>
                            <Text style={styles.label}>Date de sortie: </Text>
                            <Text style={styles.value}>{moment( new Date(movie.release_date)).format('DD/MM/YYYY')}</Text>
                        </Text>
                        <Text>
                            <Text style={styles.label}>Note moyenne: </Text>
                            { movie.vote_average    ? <Text style={styles.value}>{movie.vote_average} (basé sur {movie.vote_count} votes)</Text>
                                                    : <Text style={styles.value}>aucune</Text> }
                        </Text>
                        <Text>
                            <Text style={styles.label}>Popularité: </Text>
                            <Text style={styles.value}>{movie.popularity}%</Text>
                        </Text>
                        <Text>
                            <Text style={styles.label}>Budget: </Text>
                            { movie.budget  ? <Text style={styles.value}>{numeral(movie.budget).format('0,0[.]00$')}</Text>
                                            : <Text style={styles.value}>inconnu</Text> }
                        </Text>
                        <Text>
                            <Text style={styles.label}>Revenus générés: </Text>
                            { movie.revenue ? <Text style={styles.value}>{numeral(movie.revenue).format('0,0[.]00$')}</Text>
                                            : <Text style={styles.value}>inconnu</Text> }
                        </Text>
                        <Text>
                            <Text style={styles.label}>Genre(s): </Text>
                            <Text style={styles.value}>
                                {movie.genres.map((item) => (item.name) ).join(' / ')}
                            </Text>
                        </Text>
                        <Text>
                            <Text style={styles.label}>Companie(s): </Text>
                            <Text style={styles.value}>
                                {movie.production_companies.map((item) => (item.name) ).join(' / ')}
                            </Text>
                        </Text>
                        <Text>
                            <Text style={styles.label}>Site officiel: </Text>
                            {movie.homepage?
                                <Text style={styles.link} onPress = { () => Linking.openURL(movie.homepage)}>Voir le site officiel</Text>
                            :
                                <Text style={styles.value}>inconnu</Text>
                            }
                        </Text>
                        <TouchableOpacity
                            style={styles.googleContainer}
                            onPress = { () => Linking.openURL('https://www.google.com/search?q='+movie.title) }
                        >
                            <Image source={require('../assets/google-icon.png')} style={styles.icon}/>
                            <Text style={styles.link}>Rechercher sur google</Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
            </View>
        )
    }
}

/**
 * REDUX CONNECTION AND EXPORT
 */
const mapStateToProps = (state) => {
    return {
        favoriteMovie: state.favoriteMovie
    }
}
export default connect(mapStateToProps)(MovieDetail)

const styles = StyleSheet.create({
    mainContainer : {
        flex: 1,
        padding: 8
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 200,
        backgroundColor: '#000'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'center',
        marginTop: 10
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#aaa',
        flex: 1,
        flexWrap: 'wrap',
        marginBottom: 10
    },
    overview: {
        color: '#666',
        marginVertical: 15
    },
    label: {
        fontWeight: 'bold'
    },
    value: {
        color: '#666'
    },
    link: {
        color: '#1a73e8'
    },
    googleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 10
    },
    favoriteContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#f2f2f2',
        position: 'absolute',
        right: -1,
        top: 140,
        justifyContent: 'center',
        alignItems: 'center'
    },
    favoriteImage: {
        width: 40,
        height: 40
    }
})