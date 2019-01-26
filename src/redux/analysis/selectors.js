import {createSelector} from 'reselect'

const extractAnalysis = state => state.analysis.results;
const extractCurrentAnalysis = state => state.analysis.currentAnalysis;
const extractPagination = state => state.analysis != null ? state.analysis.pagination : null;

const extractAnalysisCount = state => state.analysis != null ? state.analysis.nrOfAllAnalysis : 0;
const extractError = state => state.error;

export const getCurrentAnalysis = createSelector(
    extractCurrentAnalysis,
    (analysis) => {
        if (analysis === null) {
            return null
        }
        analysis.days_results.map(result => {
            return Object.assign({}, result, {
                mean: prc(result.mean),
                median: prc(result.median),
                worst: prc(result.worst),
                best: prc(result.best),
                std: prc(result.std),
                date: new Date(analysis.date_of_analysis).toUTCString()
            })
        });
        return Object.assign({}, analysis, {
            mean: prc(analysis.mean) ,
            median: prc(analysis.median),
            worst: prc(analysis.worst),
            best: prc(analysis.best),
            std: prc(analysis.std),
            date: new Date(analysis.date_of_analysis).toUTCString()
        });
    }
);
export const getAnalysis = createSelector(
    extractAnalysis,
    (analysis) => {
        if (analysis === null) {
            return []
        }
        return analysis.map(analysis => {
            return Object.assign({}, analysis, {
                mean: prc(analysis.mean) ,
                median: prc(analysis.median),
                worst: prc(analysis.worst),
                best: prc(analysis.best),
                std: prc(analysis.std),
                date_of_analysis: new Date(analysis.date_of_analysis).toUTCString()
            })
        })
    }
);
const prc = (value) => {
    return value.toFixed(2) * 100
};

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