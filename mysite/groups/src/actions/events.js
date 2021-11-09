import axios from 'axios';
import { createMessage, returnErrors } from './messages';

import { GET_EVENTS } from './types';
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
