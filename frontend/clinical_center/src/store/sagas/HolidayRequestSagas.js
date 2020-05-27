import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { holidayService } from '../../services/HolidayRequestService';
import { setRequests, removeRequest } from '../actions/HolidayRequestActions';
import { deleteError } from '../actions/ErrorActions';

export function* requestsGet(action) {
  try {
    const response = yield call(() => holidayService.getRequests())
    yield put(setRequests(response))
  } catch (error) {
    console.log({ error });
  }
}

export function* requestResolve(action) {
  try {
    const { id, decision }  = action.payload
    console.log('akcija u sagi', action)
    const { data } = yield call(() => holidayService.resolveRequest(action.payload))
    yield put(removeRequest(action.payload))
  } catch ({response}) {
    yield put(deleteError(response.data.msg))
  }
}