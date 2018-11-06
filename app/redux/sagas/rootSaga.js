import { all, fork } from 'redux-saga/effects';
import {
    watchFetchMovies,
    watchAddNewMovie,
    watchUpdateMovie,
    watchDeleteMovie
} from './movieSagas.js';

export default function* rootSaga() {
      yield all([
         fork(watchFetchMovies),
         fork(watchAddNewMovie),
         fork(watchUpdateMovie),
         fork(watchDeleteMovie),
      ]);

}
