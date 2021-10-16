import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import covid19Reducer from './covid19/covid19';
import covid19FlagsReducer from './covid19/flags';

const rootReducer = combineReducers({
  covid19Data: covid19Reducer,
  nationalFlags: covid19FlagsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
