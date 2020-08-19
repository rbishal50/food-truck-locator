import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_ALL_DATA } from './constants';
import { getAllDataSuccess, getAllDataError } from './actions';

export function* getAllData() {
  try {
    const response = yield call(request, '/rqzj-sfat.json', {
      method: 'GET',
    });
    yield put(getAllDataSuccess(response));
  } catch (error) {
    yield put(getAllDataError(error));
  }
}

export default function* defaultSagas() {
  yield takeLatest(GET_ALL_DATA, getAllData);
}
