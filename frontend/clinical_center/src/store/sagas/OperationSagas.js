
import { operationService } from '../../services/OperationService';
import { call, put } from 'redux-saga/effects';
import { setOperations } from '../actions/OperationActions';


export function* operationsGet() {

    try {
        const resp = yield call(() => operationService.getOperations());
        yield put(setOperations(resp));

    } catch (err) {
        console.log(err);
    }

}