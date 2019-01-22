import {createSelector} from 'reselect'

const extractAnalysis = state => state.analysis.results;
const extractPagination = state => state.analysis != null ? state.analysis.pagination : null;

const extractAnalysisCount = state => state.analysis != null ? state.analysis.nrOfAllAnalysis : 0;
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
    extractAnalysisCount,
    (pagination, count) => {
        if (!pagination) {
            return null;
        }
        return Object.assign({}, pagination, {
            pageNumber: Math.round(count/pagination.size)
        })
    }
);