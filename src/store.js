import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

var middleware = applyMiddleware(thunk, logger);
export default createStore(reducers, middleware);