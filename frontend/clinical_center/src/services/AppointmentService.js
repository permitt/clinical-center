import ApiService from './ApiService';

const ENDPOINTS = {
    GET_APPOINTMENT_TYPES: '/api/clinics/appointment-type',
    GET_APPOINTMENT_CHECK: '/api/clinics/appointment/check/',
    POST_APPOINTMENT: 'api/clinics/appointment/',
    SCHEDULE_APPOINTMENT: 'api/clinics/appointment/schedule',
};

class appointmentServiceApi extends ApiService {

    getAppointmentTypes = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.GET_APPOINTMENT_TYPES)

        return data;
    }

    getAppointmentCheck = async (payload) => {
        const { data } = await this.apiClient.post(ENDPOINTS.GET_APPOINTMENT_CHECK, payload);
        return data;
    }

    postAppointment = async (payload) => {
        const { data } = await this.apiClient.post(ENDPOINTS.POST_APPOINTMENT, payload);
        return data;
    }

    scheduleAppointment = async (payload) => {
        const { data } = await this.apiClient.post(ENDPOINTS.SCHEDULE_APPOINTMENT, payload);
        
        return data;
    }


}

export const appointmentService = new appointmentServiceApi();