//MovieContainer connect Redux with MovieComponent
import { connect } from 'react-redux';
import Movie from '../../components/Movie/Movie.component';
//Actions
import {
    addMovieAction,
    fetchMoviesAction,
    updateItemAction,
    deleteItemAction,
} from '../actions/actions';

const mapStateToProps = (state) => {
    return {
        movies: state.movieReducers,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMovies: () => {
            dispatch(fetchMoviesAction());
        },
        onAddMovie: (newMovie) => {
            dispatch(addMovieAction(newMovie));
        },
        onUpdateMovie: (updatedMovie) => {
            dispatch(updateItemAction(updatedMovie));
        },
        onDeleteItemAction: (deletedMovieId) => {
            dispatch(deleteItemAction(deletedMovieId));
        }
    }
}

const MovieContainer = connect(mapStateToProps, mapDispatchToProps)(Movie);
export default MovieContainer;
