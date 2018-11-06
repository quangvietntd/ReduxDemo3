import {combineReducers} from 'redux';
import movieReducers from './movieReducers.js';

const allReducers = combineReducers({
  movieReducers
});
export default allReducers;
