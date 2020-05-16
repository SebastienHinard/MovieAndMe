import React from 'react'
import {StyleSheet} from 'react-native'
import MovieList from "./MovieList";
import {connect} from "react-redux";

class Favorites extends React.Component {

    render () {
        return (
            <MovieList
                movies={this.props.favoriteMovie}
                navigation={this.props.navigation}
                isFavoriteList={true}
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
export default connect(mapStateToProps)(Favorites)

const styles = StyleSheet.create({

})