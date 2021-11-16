import { GET_EVENTS, ADD_EVENT, GET_EVENT, DELETE_EVENT } from '../actions/types';

const initialState = {
    events: [],
    event: {},
};

const transformDateFormat = (json) => {
    return {
        ...json,
        start: new Date(json.start),
        end: new Date(json.end),
    };
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: [...state.events, action.payload.map(transformDateFormat)],
            };
        case ADD_EVENT:
            return {
                ...state,
                events: [...state.events, action.payload],
            };
        case GET_EVENT:
            return {
                ...state,
                event: transformDateFormat(action.payload),
            };
        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter((event) => event.id !== action.payload),
            };
        default:
            return state;
    }
}
