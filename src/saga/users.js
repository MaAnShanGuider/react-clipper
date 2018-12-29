import {put, takeEvery, call} from 'redux-saga/effects';
import {queryUsers} from './Api';
import * as actions from '../../actions/users';
import {GET_USER_REQUEST} from '../../constants/users/ActionTypes'

export function * watchFetchUsers() {
  yield takeEvery(GET_USER_REQUEST, getUsers)
}

export function* getUsers() {
  const data = yield call(queryUsers);
  yield put(actions.queryUsersSuccess(data.users));
}