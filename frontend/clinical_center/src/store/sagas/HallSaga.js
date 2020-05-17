import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { hallService } from '../../services/HallService';
import { setHalls, setDeletedHall, setHall, setEditedHall } from '../actions/HallActions';
import { deleteError, addError, editError } from '../actions/ErrorActions';

export function* hallsGet(action) {
  try {
    const response = yield call(() => hallService.getHalls())
    yield put(setHalls(response))
  } catch (error) {
    console.log({ error });
  }
}

export function* hallsSearch(action) {
  try {
    const response = yield call(() => hallService.searchHalls(action.payload))
    yield put(setHalls(response))
  } catch (error) {
    console.log({ error });
  }
}
export function* hallDelete(action) {
  try {
    const id = action.payload
    const { data } = yield call(() => hallService.deleteHall(id))
    yield put(setDeletedHall(action.payload))
  } catch ({response}) {
    yield put(deleteError(response.data.msg))
  }
}

export function* hallAdd(action) {
  try {
    const response = yield call(() => hallService.addHall(action.payload))
    yield put(setHall(action.payload))
  } catch (error) {
    console.log(error)
    yield put(addError(true))
  }
}

export function* hallEdit(action) {
  try {
    const response = yield call(() => hallService.editHall(action.payload))
    yield put(setEditedHall(action.payload))
  } catch (error) {
    yield put(editError(true))
  }
}