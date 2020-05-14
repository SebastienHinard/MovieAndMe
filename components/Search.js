import React from 'react'
import {StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator, Keyboard} from 'react-native'
import MovieItem from './MovieItem'
import {getFilmsFromApiWithSearchedText} from "../API/TMDBApi";
import {connect} from "react-redux";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.searchedText = ""
        this.page = 0
        this.totalPages = 0
        this.state = {
            movies: [],
            isLoading: false
        }
    }

    _searchMovies() {
        Keyboard.dismiss()
        this.page = 0
        this.totalPages = 0
        this.setState({
            movies: []
        }, () => {
            this._loadMovies()
        })
    }

    _loadMovies() {
        if(this.searchedText.length > 0) {
            this.setState({
                isLoading: true
            });
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
                data => {
                    this.page = data.page
                    this.totalPages = data.total_pages
                    this.setState({
                        movies : [...this.state.movies, ...data.results],
                        isLoading: false
                    })
                }
            )
        }
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
    }

    _displayMovieDetail = (movieID) => {
        this.props.navigation.navigate('MovieDetail', {movieID: movieID})
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Titre du film"
                    onChangeText = {(text) => this.searchedText = text}
                    onSubmitEditing = {() => this._searchMovies()}
                />
                <Button
                    color={'#000'}
                    title="Rechercher"
                    onPress={() => this._searchMovies()}
                />
                <FlatList
                    style={styles.list}
                    data = {this.state.movies}
                    extraData = {this.props.favoriteMovie}
                    keyExtractor = { (item) => item.id.toString() }
                    renderItem = { ({item}) => (
                        <MovieItem
                            movie={item}
                            isFavorite = { this.props.favoriteMovie.findIndex(movie => movie.id === item.id) !== -1 }
                            displayMovieDetail = {this._displayMovieDetail}
                        />
                    )}
                    onReachEndThreshold={1}
                    onEndReached = {() => {
                        if(this.page < this.totalPages) {
                            this._loadMovies()
                        }
                    }}
                />
                {this._displayLoading()}
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
export default connect(mapStateToProps)(Search)


const styles = StyleSheet.create({
    mainContainer: {
        margin: 8,
        flex: 1
    },
    textInput: {
        borderColor: '#c4c4c4',
        borderWidth: 0.5,
        borderRadius: 2,
        padding: 4,
        marginBottom: 4,
        backgroundColor: '#fff'
    },
    list : {
        marginTop: 10,
        flex: 1
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 200,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})