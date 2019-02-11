import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import rootReducer from './';

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

// THIS FILE MAY BE TRASH!
// i wanted to create a store outside of the root component so that it could be accessed outside, but it seems like it mnay not be a good plan
