import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { hallService } from '../../services/HallService';
import { setHalls } from '../actions/HallActions';
import { DASHBOARD } from '../../routes';

export function* hallsGet(action) {
  try {
    const response = yield call(() => hallService.getHalls())
    yield put(setHalls(response));
  } catch (error) {
    console.log({ error });
  }
}