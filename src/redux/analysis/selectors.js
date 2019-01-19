import {createSelector} from 'reselect'

const extractAnalysis = state =>  state.analysis.results;

const extractAnalysisCount = state => state.analysis.nrOfAllAnalysis;
const extractError = state => state.error;

export const getAnalysis = createSelector(
    extractAnalysis,
    (analysis) => {
        if (analysis === null) {
            return []
        }
        return analysis
    }
);

export const getAnalysisCount = createSelector(
    extractAnalysisCount,
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