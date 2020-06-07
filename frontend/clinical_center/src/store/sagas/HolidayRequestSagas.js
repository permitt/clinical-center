import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { holidayService } from '../../services/HolidayRequestService';
import { setRequests, removeRequest, requestResolved } from '../actions/HolidayRequestActions';
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
    const { data } = yield call(() => holidayService.resolveRequest(action.payload))
    yield put(removeRequest(id))
  } catch ({response}) {
    yield put(deleteError(response.data.msg))
  }
}

export function* requestCreate(action) {
  try {
    const { data } = yield call(() => holidayService.createRequest(action.payload))
    alert('Holiday request sent.')
  } catch (error) {
    console.log(error)
  }
}