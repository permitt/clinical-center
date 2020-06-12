import ApiService from './ApiService';

const ENDPOINTS = {
    GET_APPOINTMENT_TYPES: '/api/clinics/appointment-type',
    POST_APPOINTMENT_CHECK: '/api/clinics/appointment/check/',
    APPOINTMENT: 'api/clinics/appointment/',
    DELETE_APPOINTMENT: 'api/clinics/appointment/:id/',
    POST_APPOINTMENT: 'api/clinics/appointment/',
    SCHEDULE_APPOINTMENT: 'api/clinics/appointment/schedule',
    CREATE_APPOINTMENT_TERM: 'api/clinics/appointment/appterm/',
};

class appointmentServiceApi extends ApiService {

    getAppointmentTypes = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.GET_APPOINTMENT_TYPES)

        return data;
    }

    getAppointmentCheck = async (payload) => {
        const { data } = await this.apiClient.post(ENDPOINTS.POST_APPOINTMENT_CHECK, payload);
        return data;
    }

    postAppointment = async (payload) => {
        const { data } = await this.apiClient.post(ENDPOINTS.APPOINTMENT, payload);
        return data;
    }

    getAppointments = async () => {
        const queryString = 'all=true'
        const { data } = await this.apiClient.get(ENDPOINTS.APPOINTMENT + `?${queryString}`);
        return data;
    }
    scheduleAppointment = async (payload) => {
        const { data } = await this.apiClient.post(ENDPOINTS.SCHEDULE_APPOINTMENT, payload);

        return data;
    }

    deleteAppointment = async (id) => {
        const { data } = await this.apiClient.delete(ENDPOINTS.DELETE_APPOINTMENT.replace(":id", id));

        return data;
    }

    getAvailableAppointments = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.APPOINTMENT, { available: true });
        return data;
    }

    createAvailableAppointment = async (payload) => {
        const { data } = await this.apiClient.post(ENDPOINTS.CREATE_APPOINTMENT_TERM, payload);

        return data;
    }

}

export const appointmentService = new appointmentServiceApi();