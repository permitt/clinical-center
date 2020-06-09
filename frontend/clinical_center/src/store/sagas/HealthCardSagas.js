import { healthCardService } from '../../services/HealthCardService';
import { call, put } from 'redux-saga/effects';
import { setHealthCard } from '../actions/HealthCardActions';

export function* healthCardGet() {
    try {
        const data = yield call(() => healthCardService.getHealthCard());
        yield put(setHealthCard(data));

    } catch (error) {
        alert(error);
        console.log(error);
    }

}