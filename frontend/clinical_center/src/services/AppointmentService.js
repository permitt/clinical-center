import ApiService from './ApiService';

const ENDPOINTS = {
    GET_APPOINTMENT_TYPES: '/api/clinics/appointment-type',

};

class appointmentServiceApi extends ApiService {

    getAppointmentTypes = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.GET_APPOINTMENT_TYPES)

        return data;
    }


}

export const appointmentService = new appointmentServiceApi();