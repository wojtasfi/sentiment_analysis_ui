import * as types from "./types";
import * as api from '../../shared/api'

export const getNumberOfPendingAnalysis = () => (dispatch, getState) => {
    dispatch({type: types.GET_NR_OF_PENDING, payload: 0});

    return api.getAnalysisPendingCount().then(response => {
        dispatch({
            type: types.GET_NR_OF_PENDING_SUCCESS,
            payload: response.data
        })
    }).catch(error => {
        dispatch({
            type: types.GET_NR_OF_PENDING_FAIL,
            payload: error
        })
    })
};

export const getAnalysisPending = () => (dispatch, getState) => {
    dispatch({type: types.GET_ANALYSIS_PENDING, payload: []});

    return api.getAnalysisPending().then(response => {
        dispatch({
            type: types.GET_ANALYSIS_PENDING_SUCCESS,
            payload: response.data
        })
    }).catch(error => {
        dispatch({
            type: types.GET_ANALYSIS_PENDING_FAIL,
            payload: error
        })
    })
};

export const submitAnalysisPending = (text) => (dispatch, getState) => {
    console.log(text)
    dispatch({type: types.SUBMIT_ANALYSIS_PENDING, payload: text});

    return api.submitAnalysis(text).then(response => {
        dispatch({
            type: types.SUBMIT_ANALYSIS_PENDING_SUCCESS,
            payload: text
        })
    }).catch(error => {
        dispatch({
            type: types.SUBMIT_ANALYSIS_PENDING_FAIL,
            payload: error
        })
    })
};

