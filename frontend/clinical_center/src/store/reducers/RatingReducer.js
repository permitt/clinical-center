import { SET_DOCTOR_RATINGS, SET_CLINIC_RATINGS, SET_CLINIC_RATING, SET_DOCTOR_RATING } from '../actions/ActionTypes';

const initialState = {
    doctorRatings: [],
    clinicRatings: [],
}

const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DOCTOR_RATINGS:
            return { ...state, doctorRatings: action.payload };
        case SET_CLINIC_RATINGS:
            return { ...state, clinicRatings: action.payload };
        case SET_DOCTOR_RATING:
            return { ...state, doctorRatings: [...state.doctorRatings, action.payload] };
        case SET_CLINIC_RATING:
            return { ...state, clinicRatings: [...state.clinicRatings, action.payload] };
        default:
            return state;
    }
};

export default ratingReducer;