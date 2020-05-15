import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { typeService } from '../../services/AppointmentTypeService';
import { setTypes, setDeletedType, setType, setEditedType } from '../actions/AppointmentTypeActions';
import { deleteError } from '../actions/ErrorActions';
import { registerError } from '../actions/AuthActions';

export function* typesGet(action) {
  try {
    const response = yield call(() => typeService.getTypes())
    console.log('response', response)
    yield put(setTypes(response))
  } catch (error) {
    console.log({ error });
  }
}

export function* typesSearch(action) {
  try {
    const response = yield call(() => typeService.searchTypes(action.payload))
    yield put(setTypes(response))
  } catch (error) {
    console.log({ error });
  }
}
export function* typeDelete(action) {
  try {
    const id = action.payload
    const { data } = yield call(() => typeService.deleteType(id))
    yield put(setDeletedType(action.payload))
  } catch ({response}) {
    yield put(deleteError(response.data.msg))
  }
}

export function* typeAdd(action) {
  try {
    const response = yield call(() => typeService.addType(action.payload))
    yield put(setType(action.payload))
  } catch (error) {
    console.log(error)
    yield put(registerError(true))
  }
}

export function* typeEdit(action) {
  try {
    const response = yield call(() => typeService.editType(action.payload))
    yield put(setEditedType(action.payload))
  } catch (error) {
    yield put(registerError(true))
  }
}