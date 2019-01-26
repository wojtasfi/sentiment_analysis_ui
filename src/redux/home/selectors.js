import {createSelector} from 'reselect'

const extractTwitterAuthExists = state => state.home.twitterAuthExists;
const extractTwitterAuthError = state => state.home.twitterAuthError;
const extractError = state => state.home.error;

export const getTwitterAuthExists = createSelector(
    extractTwitterAuthExists,
    (auth) => {
        if (!auth) {
            return null;
        }
        return auth
    }
);

export const getTwitterAuthError = createSelector(
    extractTwitterAuthError,
    (error) => {
        if (!error) {
            return null;
        }
        return error
    }
);

export const getError = createSelector(
    extractError,
    (error) => {
        if (!error) {
            return null;
        }
        return error
    }
);