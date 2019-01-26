import * as types from "./types";
import {storeError, clearCurrentError} from "../../shared/shared-reducers";

const initialState = {
    twitterAuthExists: null,
    twitterAuthError: null,
    error: null
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.GET_TWITTER_AUTH_EXISTS:
            return clearCurrentError(state);

        case types.GET_TWITTER_AUTH_EXISTS_SUCCESS:
            return {...state, twitterAuthExists: action.payload === 'True'};

        case types.GET_TWITTER_AUTH_EXISTS_FAIL:
            return storeError(state, action.payload);

        case types.GET_TWITTER_AUTH_ERROR:
            return  {...state, twitterAuthError: null, error: null};

        case types.GET_TWITTER_AUTH_ERROR_SUCCESS:
            let error = null;
            if(action.payload !== null){
                error = action.payload
            }
            return {...state, twitterAuthError: error};

        case types.GET_TWITTER_AUTH_ERROR_FAIL:
            return storeError(state, action.payload);


        case types.ADD_TWITTER_AUTH:
            return clearCurrentError(state);

        case types.ADD_TWITTER_AUTH_SUCCESS:
            return Object.assign({}, state, {
                twitterAuthExists: true
            });

        case types.ADD_TWITTER_AUTH_FAIL:
            return storeError(state, action.payload);

        default:
            return state
    }
};

export default homeReducer