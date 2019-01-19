import Axios from 'axios'

//todo externalize
const host = "http://localhost:8000/";

//Analysis
export const getAnalysisCount =() => {
    return Axios.get(host + 'sentiments/analysis/count/')
};

export const getAnalysis =() => {
    return Axios.get(host + 'sentiments/analysis/')
};

export const getSingleAnalysis =(id) => {
    return Axios.get(host + 'sentiments/analysis/' + id + '/')
};

//Analysis pending
export const getAnalysisPendingCount =() => {
    return Axios.get(host + 'sentiments/analysis/pending/count/')
};

export const getAnalysisPending =() => {
    return Axios.get(host + 'sentiments/analysis/pending/')
};

export const submitAnalysis =(text) => {
    return Axios.post(host + 'sentiments/analysis/pending/', text)
};

export const getSingleAnalysisPending =(id) => {
    return Axios.get(host + 'sentiments/analysis/pending/' + id + '/')
};