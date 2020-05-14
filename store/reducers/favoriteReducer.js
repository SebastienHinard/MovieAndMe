const initialState = {
    favoriteMovie : []
}

/**
 * PERMET D'AJOUTER OU DE RETIRER UN FILM AUX FAVORIS
 * @param state
 * @param action
 * @returns {{favoriteMovies: [], favoriteMovie: *[]}|{favoriteMovies: []}}
 */
const toggleFavorite = (state = initialState, action) => {
    let nexState

    switch (action.type) {
        //TOGGLE FAVORITE
        case 'TOGGLE_FAVORITE':
            const favoriteMovieIndex = state.favoriteMovie.findIndex(item =>item.id === action.value.id)

            //Si le film est déjà dans les favoris
            if (favoriteMovieIndex !== -1) {
                nexState = {
                    ...state,
                    favoriteMovie: state.favoriteMovie.filter(
                        (item,index) => index !== favoriteMovieIndex
                    )
                }
            //Si le film n'est pas encore dans les favoris
            } else {
                nexState = {
                    ...state,
                    favoriteMovie: [...state.favoriteMovie, action.value]
                }
            }
            return nexState || state

        //DEFAULT
        default:
            return state
    }
}

export default toggleFavorite