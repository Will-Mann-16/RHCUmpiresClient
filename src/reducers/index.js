import {combineReducers} from 'redux';
import umpire from './umpireReducer';
import fixtures from './fixturesReducer';

export default combineReducers({
    umpire,
    fixtures
});