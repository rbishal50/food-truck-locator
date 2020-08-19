import { all, fork } from 'redux-saga/effects';
import HomeSagas from 'containers/Home/saga.js';

export default function* rootSaga() {
  yield all([HomeSagas].map(fork));
}
