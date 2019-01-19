import * as types from "./types";
import * as api from '../../shared/api'

export const getNumberOfAnalysis = (dispatch) => {
    dispatch({type: types.GET_NR_OF_ANALYSIS, payload: {}});

    return api.getAnalysisCount().then(response => {
        dispatch({
            type: types.GET_NR_OF_ANALYSIS_SUCCESS,
            payload: response.data
        })
    }).catch(error => {
        dispatch({
            type: types.GET_NR_OF_ANALYSIS_FAIL,
            payload: error
        })
    })

};

export const getAnalysis = (dispatch) => {
    dispatch({type: types.GET_ANALYSIS, payload: []});

    return api.getAnalysis().then(response => {
        dispatch({
            type: types.GET_ANALYSIS_SUCCESS,
            payload: response.data
        })
    }).catch(error => {
        dispatch({
            type: types.GET_ANALYSIS_FAIL,
            payload: error
        })
    })

};

