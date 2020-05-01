import ApiService from './ApiService';

const ENDPOINTS = {
    GET_ALL_CLINICS: '/api/clinics/clinic/',
    GET_CLINIC: '/api/clinics/clinic/:id',
};

class clinicServiceApi extends ApiService {

    getAll = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.GET_ALL_CLINICS)

        return data;
    }

    getClinic = id => {

        return this.apiClient.delete(ENDPOINTS.GET_CLINIC.replace(":id", id));
    }

}

export const clinicService = new clinicServiceApi();