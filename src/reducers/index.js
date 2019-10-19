import { combineReducers } from 'redux';

import cards from './cards';
import filterCards from './filterCards';

export default combineReducers({
  cards,
  filterCards
});