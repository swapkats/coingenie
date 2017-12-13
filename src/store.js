import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(combineReducers(reducers), applyMiddleware(thunk));
} else {
  const rdt = require('redux-devtools-extension');
  store = createStore(combineReducers(reducers), rdt.composeWithDevTools(applyMiddleware(thunk)));
}

export default store;
