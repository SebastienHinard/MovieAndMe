import React from 'react'
import MovieItem from "./MovieItem";
import {FlatList, StyleSheet} from "react-native";
import {connect} from "react-redux";

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }

    _displayMovieDetail = (movieID) => {
        this.props.navigation.navigate('MovieDetail', {movieID: movieID})
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.movies}
                extraData={this.props.favoriteMovie}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <MovieItem
                        movie={item}
                        isFavorite={this.props.favoriteMovie.findIndex(movie => movie.id === item.id) !== -1}
                        displayMovieDetail={this._displayMovieDetail}
                    />
                )}
                onReachEndThreshold={1}
                onEndReached={() => {
                    if (this.props.page < this.props.totalPages) {
                        this.props.loadMovies()
                    }
                }}
            />
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
export default connect(mapStateToProps)(MovieList)

const styles = StyleSheet.create({
    list : {
        marginTop: 10,
        flex: 1
    }
})