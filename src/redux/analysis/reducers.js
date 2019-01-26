import * as types from "./types";
import {storeError, clearCurrentError} from "../../shared/shared-reducers";

const initialState = {
    results: null,
    pagination: {
        page: 1,
        size: 10,
        sort: 'text',
        order: 'asc'
    },
    currentAnalysis: null,
    nrOfAllAnalysis: null,
    error: null
};

const analysisReducer = (state = initialState, action) => {
    switch (action.type) {
        //analysis
        case types.GET_ANALYSIS:
            return clearCurrentError(state);

        case types.GET_ANALYSIS_SUCCESS:
            return Object.assign({}, state, {
                results: action.payload
            });
        case types.GET_ANALYSIS_FAIL:
            return storeError(state, action.payload);

        //nr of analysis
        case types.GET_NR_OF_ANALYSIS:
            return clearCurrentError(state);

        case types.GET_NR_OF_ANALYSIS_SUCCESS:
            return Object.assign({}, state, {
                nrOfAllAnalysis: action.payload
            });
        case types.GET_NR_OF_ANALYSIS_FAIL:
            return storeError(state, action.payload);

        //pagination
        case types.CHANGE_PAGE:
            return updatePage(state, action);

        case types.CHANGE_SIZE:
            return updateSize(state, action);

        case types.CHANGE_SORT:
            return updateSort(state, action);

        case types.CHANGE_ORDER:
            return updateOrder(state, action);

            //single analysis
        case types.GET_SINGLE_ANALYSIS_SUCCESS:
            return Object.assign({}, state, {
                currentAnalysis: action.payload
            });
        default:
            return state
    }
};

//todo think about using combineReducers for better readability
const updateSize = (state, action) => {
    return {
        ...state,
        pagination: {
            ...state.pagination,
            size: action.payload,
        }
    };
};

const updatePage = (state, action) => {
    return {
        ...state,
        pagination: {
            ...state.pagination,
            page: action.payload,
        }
    };
};

const updateSort = (state, action) => {
    return {
        ...state,
        pagination: {
            ...state.pagination,
            sort: action.payload,
        }
    };
};

const updateOrder = (state, action) => {
    return {
        ...state,
        pagination: {
            ...state.pagination,
            order: action.payload,
        }
    };
};
export default analysisReducer