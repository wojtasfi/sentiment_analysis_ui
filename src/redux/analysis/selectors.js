import {createSelector} from 'reselect'

const extractAnalysis = state => state.analysis.results;
const extractPagination = state => state.analysis.pagination;

const extractAnalysisCount = state => state.analysis.nrOfAllAnalysis;
const extractError = state => state.error;

export const getAnalysis = createSelector(
    extractAnalysis,
    (analysis) => {
        if (analysis === null) {
            return []
        }
        return analysis.map(analysis => {
            return Object.assign({}, analysis, {
                mean: analysis.mean.toFixed(2),
                date_of_analysis: new Date(analysis.date_of_analysis).toUTCString()
            })
        })
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

export const getPagination = createSelector(
    extractPagination,
    (pagination) => {
        if (!pagination) {
            return null;
        }
        return pagination
    }
);