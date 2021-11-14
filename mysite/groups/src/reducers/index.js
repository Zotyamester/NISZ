import { combineReducers } from 'redux';
import groups from './groups';
import events from './events';

export default combineReducers({
    groups,
    events
});
