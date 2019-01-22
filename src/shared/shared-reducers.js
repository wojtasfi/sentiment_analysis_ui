export const storeError = (state, error) => {
    return Object.assign({}, state, {
        error: error
    });
};

export const clearCurrentError = (state) => {
    return {
        ...state,
        error: null
    }
};