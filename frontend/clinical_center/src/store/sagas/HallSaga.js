import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { hallService } from '../../services/HallService';
import { setHalls, setDates } from '../actions/HallActions';
import { DASHBOARD } from '../../routes';

export function* hallsGet(action) {
  try {
    const response = yield call(() => hallService.getHalls())
    console.log(response)
    yield put(setHalls(response.halls))
    yield put(setDates(response.reservedDates));
  } catch (error) {
    console.log({ error });
  }
}