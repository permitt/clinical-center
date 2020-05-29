import { call, put, select } from 'redux-saga/effects';
import { push, go } from 'connected-react-router'
import { typeService } from '../../services/AppointmentTypeService';
import { setTypes, setDeletedType, setType, setEditedType } from '../actions/AppointmentTypeActions';
import { deleteError, editError, addError } from '../actions/ErrorActions';

export function* typesGet(action) {
  try {
    const response = yield call(() => typeService.getTypes())
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
    yield put(setType(response))
  } catch (error) {
    console.log(error)
    yield put(addError(true))
  }
}

export function* typeEdit(action) {
  try {
    const response = yield call(() => typeService.editType(action.payload))
    yield put(setEditedType(response))
  } catch (error) {
    console.log(error)
    yield put(editError(true))
  }
}