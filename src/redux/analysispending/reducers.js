import * as types from "./types";
import {storeError, clearCurrentError} from "../../shared/shared-reducers";

const initialState = {
    results: null,
    nrOfAllAnalysis: null,
    error: null
};

const analysisPendingReducer = (state = initialState, action) => {
    switch (action.type) {
        //pending
        case types.GET_ANALYSIS_PENDING:
            return clearCurrentError(state);

        case types.GET_ANALYSIS_PENDING_SUCCESS:
            return Object.assign({}, state, {
                results: action.payload
            });
        case types.GET_ANALYSIS_PENDING_FAIL:
            return storeError(state, action.payload);

        //nr of pending
        case types.GET_NR_OF_PENDING:
            return clearCurrentError(state);

        case types.GET_NR_OF_PENDING_SUCCESS:
            return Object.assign({}, state, {
                nrOfAllAnalysis: action.payload
            });
        case types.GET_NR_OF_PENDING_FAIL:
            return storeError(state, action.payload);

        //submitting
        case types.SUBMIT_ANALYSIS_PENDING_SUCCESS:
            return clearCurrentError(state);

        case types.SUBMIT_ANALYSIS_PENDING_FAIL:
            return storeError(state, action.payload);

        default:
            return state
    }
};

export default analysisPendingReducer