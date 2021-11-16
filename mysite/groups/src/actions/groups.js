import axios from 'axios';
import { createMessage, returnErrors } from './messages';

import { GET_GROUPS, GET_GROUP, ADD_GROUP, DELETE_GROUP } from './types';
import { tokenConfig } from './auth';

export const getGroups = (q = '') => (dispatch) => {
    q = q.trim();
    axios
        .get(`/api/groups/${(q != '') ? '?q=' + encodeURIComponent(q) : ''}`)
        .then((res) => {
            dispatch({
                type: GET_GROUPS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addGroup = (group) => (dispatch) => {
    axios
        .post('/api/groups/', group, tokenConfig())
        .then((res) => {
            dispatch(createMessage({ addGroup: 'Group Added' }));
            dispatch({
                type: ADD_GROUP,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getGroup = (id) => (dispatch) => {
    axios
        .get(`/api/groups/${ id }/`)
        .then((res) => {
            dispatch({
                type: GET_GROUP,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteGroup = (id) => (dispatch) => {
    axios
        .delete(`/api/groups/${ id }/`, tokenConfig())
        .then((res) => {
            dispatch(createMessage({ deleteGroup: 'Group Deleted' }));
            dispatch({
                type: DELETE_GROUP,
                payload: id,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
