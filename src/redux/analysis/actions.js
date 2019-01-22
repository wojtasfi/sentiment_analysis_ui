import * as types from "./types";
import * as api from '../../shared/api'
import * as analysisSelectors from "../../redux/analysis/selectors";

export const getNumberOfAnalysis = () => (dispatch, getState) => {
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
                                //thanks to redux thunk
export const getAnalysis = () => (dispatch, getState) => {
        dispatch({type: types.GET_ANALYSIS, payload: []});
        const pagination = analysisSelectors.getPagination(getState());
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

export const changePage = (page) => (dispatch, getState) => {
    dispatch({
        type: types.CHANGE_PAGE,
        payload: page
    });
    dispatch(getAnalysis())
};

export const changeSize = (size) => (dispatch, getState) => {
    dispatch({
        type: types.CHANGE_SIZE,
        payload: size
    });
    dispatch(getAnalysis())
};

export const changeSort = (sort) => (dispatch, getState) => {
    dispatch({
        type: types.CHANGE_SORT,
        payload: sort
    });
    dispatch(getAnalysis())
};

export const changeOrder = (order) => (dispatch, getState) => {
    dispatch({
        type: types.CHANGE_ORDER,
        payload: order
    });
    dispatch(getAnalysis())
};