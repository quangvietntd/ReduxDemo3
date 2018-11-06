// Thay localhost bằng IP address, sử dụng 10.0.2.2 cho máy ảo mặc định của google,
// 10.0.3.2 cho máy ảo Genymotion
import { create } from 'apisauce';

const api = create({ baseURL: 'http://10.0.3.2:3000' });

function* getMoviesFromApi() {
    const response = yield api.get('/movies');
    const movies = response.ok ? response.data : [];
    return movies;
}

//send POST request to add new movie.
function* insertNewMovieFromApi(newMovie) {
    const response = yield api.post('/movies', {
        name: newMovie.name,
        releaseYear: newMovie.releaseYear
    });
    return response.ok;
}

//Send PUT request to update existing Movie
function* updateMovieFromApi(updatedMovie) {
    const response = yield api.put(`/movies/${updatedMovie.id.toString()}`, {
        name: updatedMovie.name,
        releaseYear: updatedMovie.releaseYear
    });
    return response.ok;
}

//Send DELETE request to update existing Movie
function* deleteMovieFromApi(deletedMovieId) {
    const response = yield api.delete(`/movies/${deletedMovieId}`);
    return response.ok;
}

export const Api = {
    getMoviesFromApi,
    insertNewMovieFromApi,
    updateMovieFromApi,
    deleteMovieFromApi,
};
