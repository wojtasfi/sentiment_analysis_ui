import * as types from "./types";
import * as api from '../../shared/api'

export const getTwitterAuthExists = () => (dispatch, getState) => {
    dispatch({type: types.GET_TWITTER_AUTH_EXISTS, payload: {}});

    return api.getTwitterAuthExists().then(response => {
        dispatch({
            type: types.GET_TWITTER_AUTH_EXISTS_SUCCESS,
            payload: response.data
        })
    }).catch(error => {
        dispatch({
            type: types.GET_TWITTER_AUTH_EXISTS_FAIL,
            payload: error
        })
    })

};

export const getTwitterAuthError = () => (dispatch, getState) => {
    dispatch({type: types.GET_TWITTER_AUTH_ERROR, payload: {}});

    return api.getTwitterAuthError().then(response => {
        dispatch({
            type: types.GET_TWITTER_AUTH_ERROR_SUCCESS,
            payload: response.data
        })
    }).catch(error => {
        dispatch({
            type: types.GET_TWITTER_AUTH_ERROR_FAIL,
            payload: error
        })
    })

};


export const submitTwitterAuth = (auth) => (dispatch, getState) => {
    dispatch({type: types.ADD_TWITTER_AUTH, payload: auth});

    return api.submitTwitterAuth(auth).then(response => {
        dispatch({
            type: types.ADD_TWITTER_AUTH_SUCCESS,
            payload: auth
        })
    }).catch(error => {
        dispatch({
            type: types.ADD_TWITTER_AUTH_FAIL,
            payload: error
        })
    })
};