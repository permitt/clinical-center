import ApiService from './ApiService';

const ENDPOINTS = {
    DOCTOR_RATINGS: '/api/clinics/doctor-rating/',
    CLINIC_RATINGS: '/api/clinics/clinic-rating/',
    DOCTOR_RATING: '/api/clinics/doctor-rating/:id/',
    CLINIC_RATING: '/api/clinics/clinic-rating/:id/',
};

class RatingService extends ApiService {

    getDoctorRatings = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.DOCTOR_RATINGS);

        return data;
    }

    getClinicRatings = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.CLINIC_RATINGS);

        return data;
    }

    putDoctorRating = async (rating) => {
        const { data } = await this.apiClient.put(ENDPOINTS.DOCTOR_RATING.replace(':id', rating.id), rating);

        return data;
    }

    putClinicRating = async (rating) => {
        const { data } = await this.apiClient.put(ENDPOINTS.CLINIC_RATING.replace(':id', rating.id), rating);

        return data;
    }

    postDoctorRating = async payload => {
        const { data } = await this.apiClient.post(ENDPOINTS.DOCTOR_RATINGS, payload);
        return data;
    }

    postClinicRating = async payload => {
        const { data } = await this.apiClient.post(ENDPOINTS.CLINIC_RATINGS, payload);
        return data;
    }
}

export const ratingService = new RatingService();