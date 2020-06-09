
import { ratingService } from '../../services/RatingService';
import { setDoctorRatings, setClinicRatings, setClinicRating, setDoctorRating } from '../actions/RatingActions';
import { call, put } from 'redux-saga/effects';

export function* doctorRatingsGet() {

    try {
        const resp = yield call(() => ratingService.getDoctorRatings());
        yield put(setDoctorRatings(resp));

    } catch (err) {
        console.log(err);
    }

}

export function* clinicRatingsGet() {

    try {
        const resp = yield call(() => ratingService.getClinicRatings());
        yield put(setClinicRatings(resp));

    } catch (err) {
        console.log(err);
    }

}

export function* putClinicRating(action) {

    try {
        const resp = yield call(() => ratingService.putClinicRating(action.payload));
        yield put(setClinicRating(resp));
    } catch (err) {
        alert(err);
        console.log(err);
    }
}

export function* putDoctorRating(action) {

    try {
        const resp = yield call(() => ratingService.putDoctorRating(action.payload));
        yield put(setDoctorRating(resp));

    } catch (err) {
        alert(err);
        console.log(err);
    }
}

export function* postDoctorRating(action) {

    try {
        const resp = yield call(() => ratingService.postDoctorRating(action.payload));
        yield put(setDoctorRating(resp));
    } catch (err) {
        console.log(err);
    }
}

export function* postClinicRating(action) {

    try {
        const resp = yield call(() => ratingService.postClinicRating(action.payload));
        yield put(setClinicRating(resp));

    } catch (err) {
        console.log(err);
    }
}