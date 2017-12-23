import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import reducers from './reducers';

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = compose(applyMiddleware(thunk));
} else {
  const rdt = require('redux-devtools-extension');
  enhancer = compose(rdt.composeWithDevTools(applyMiddleware(thunk)));
}

export default createStore(combineReducers(reducers), enhancer, persistState());
