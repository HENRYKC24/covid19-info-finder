import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import covid19Reducer from './covid19/covid19';

const rootReducer = combineReducers({ covid19Data: covid19Reducer });

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
