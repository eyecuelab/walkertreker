import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import rootReducer from '/src/reducers';

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
