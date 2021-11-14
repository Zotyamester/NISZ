import axios from 'axios';
import { createMessage, returnErrors } from './messages';

import { GET_EVENTS, ADD_EVENT, DELETE_EVENT } from './types';
import { tokenConfig } from './auth';

export const getEvents = (id, from, to) => (dispatch) => {
    axios
        .get(`/api/events/?group=${ id }&from=${ from }&to=${ to }`)
        .then((res) => {
            dispatch({
                type: GET_EVENTS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addEvent = (event) => (dispatch) => {
    axios
        .post('/api/events/', event, tokenConfig())
        .then((res) => {
            dispatch(createMessage({ addEvent: 'Event Added' }));
            dispatch({
                type: ADD_EVENT,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getEvent = (id) => (dispatch) => {
    axios
        .get(`/api/events/${ id }/`)
        .then((res) => {
            dispatch({
                type: GET_EVENT,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteEvent = (id) => (dispatch) => {
    axios
        .delete(`/api/events/${ id }/`, tokenConfig())
        .then((res) => {
            dispatch(createMessage({ deleteEvent: 'Event Deleted' }));
            dispatch({
                type: DELETE_EVENT,
                payload: id,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
