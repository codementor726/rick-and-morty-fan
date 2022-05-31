import {combineReducers} from 'redux';

import FavoriteReducer from './favorite';

export default combineReducers({
  favorite: FavoriteReducer,
});
