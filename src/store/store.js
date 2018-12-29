import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";
import appReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import { helloSaga } from '../saga/index';
const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

export const Store = createStore(
		appReducer,
		applyMiddleware(sagaMiddleware)
		);

sagaMiddleware.run(helloSaga);