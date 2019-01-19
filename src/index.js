import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { combineReducers } from 'redux';
import analysisReducer from "./redux/analysis/reducers";
import analysisPendingReducer from "./redux/analysispending/reducers";

const rootReducer = combineReducers({
    analysis: analysisReducer,
    analysisPending: analysisPendingReducer
});

const logger = createLogger({
    // ...options
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.root'));

