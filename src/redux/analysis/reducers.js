import * as types from "./types";
import {storeError, clearCurrentError} from "../../shared/shared-reducers";

const initialState = {
    results: null,
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


        default:
            return state
    }
};




export default analysisReducer