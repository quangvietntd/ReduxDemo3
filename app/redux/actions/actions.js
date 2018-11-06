// Action creators
import {ADD_MOVIE,FETCH_MOVIE,FETCH_FAILED,FETCH_SUCCEEDED,
  UPDATE_MOVIE,UPDATE_SUCCEEDED,
  DELETE_MOVIE,DELETE_SUCCEEDED} from './actionTypes.js';



export const fetchMoviesAction = (sort) => {
  return {
    type: FETCH_MOVIE,
    sort
  }
}

export const addMovieAction = (newMovie) => {
  return {
    type: ADD_MOVIE,
    //newMovie: newMovie giong voi cau lenh ben duoi
    newMovie

  }
}

//Action sent by Redux-saga
export const fetchSuccessAction = (receivedMovies) => {
  return {
    type: FETCH_SUCCEEDED,
    receivedMovies
  }
}

export const fetchFailedAction = (error) => {
  return {
    type: FETCH_FAILED,
    error
  }
}
//update existing movie
export const updateItemAction = (updatedMovie) => {
  return {
    type: UPDATE_MOVIE,
    updatedMovie
  }
}
//Action sent by Redux-saga
export const updateItemSuccessAction = (updatedMovie) => {
  return {
    type: UPDATE_SUCCEEDED,
    updatedMovie
  }
}
//delete existing movies
export const deleteItemAction = (deletedMovieId) => {
  return {
    type: DELETE_MOVIE,
    deletedMovieId
  }
}
//Action sent by Redux-saga
export const deleteItemSuccessAction = (deletedMovieId) => {
  return {
    type: DELETE_SUCCEEDED,
    deletedMovieId
  }
}
