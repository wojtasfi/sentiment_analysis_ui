import {createSelector} from 'reselect'

const extractAnalysisPending = state => state.analysisPending.results;
const extractAnalysisPendingCount = state => state.analysisPending.nrOfAllAnalysis;
const extractError = state => state.error;

export const getAnalysisPending = createSelector(
    extractAnalysisPending,
    (analysis) => {
        if (analysis == null) {
            return []
        }
        return analysis
    }
);

export const getAnalysisPendingCount = createSelector(
    extractAnalysisPendingCount,
    (count) => {
        if (!count) {
            return 0;
        }
        return count
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