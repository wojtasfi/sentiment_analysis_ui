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

export const getAnalysis = (pagination, dispatch) => {
    dispatch({type: types.GET_ANALYSIS, payload: []});

    return api.getAnalysis(pagination).then(response => {
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

export const changePage = (page, dispatch) => {
    dispatch({
        type: types.CHANGE_PAGE,
        payload: page
    })
};

export const changeSize = (size, dispatch) => {
    dispatch({
        type: types.CHANGE_SIZE,
        payload: size
    })
};

export const changeSort = (sort, dispatch) => {
    dispatch({
        type: types.CHANGE_SORT,
        payload: sort
    })
};

export const changeOrder = (order, dispatch) => {
    dispatch({
        type: types.CHANGE_ORDER,
        payload: order
    })
};