import ApiService from './ApiService';

const ENDPOINTS = {
    GET_APPOINTMENT_TYPES: '/api/clinics/appointment-type',
    GET_APPOINTMENT_CHECK: '/api/clinics/appointment/check/',

};

class appointmentServiceApi extends ApiService {

    getAppointmentTypes = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.GET_APPOINTMENT_TYPES)

        return data;
    }

    getAppointmentCheck = async (payload) => {
        console.log('STIGAO : ', payload);
        const { data } = await this.apiClient.post(ENDPOINTS.GET_APPOINTMENT_CHECK, payload);
        console.log('NAZAAD : ', data);
        return data;
    }


}

export const appointmentService = new appointmentServiceApi();