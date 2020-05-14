/**
 * =========== HELPERS POUR L'UTILISATION DE L'API THE MOVIE DATABASE =====================
 * ========================================================================================
 */


/** =========== CLE API ================= */
const API_TOKEN = '113f5460d7d19d9e8265a50595d88c97';


/** =========== HELPERS ================== */

/**
 * PERMET LA RECUPERATION D'UNE LISTE DE FILMS
 * @param text
 * @param page
 * @returns {Promise<any | void>}
 */
export function getFilmsFromApiWithSearchedText (text,page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

/**
 * PERMET LA RECUPERATION DES DETAILS D'UN FILM
 * @param id
 * @returns {Promise<any | void>}
 */
export function getMovieDetailFromApi (id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

/**
 * PERMET LA RECUPERATION DE L'IMAGE D'UN FILM
 * @param name
 * @returns {string}
 */
export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}