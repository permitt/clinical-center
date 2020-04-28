import ApiService from './ApiService';

const ENDPOINTS = {
    GET_ALL_CLINICS: '/api/clinics/clinic/',
    GET_CLINIC: '/api/clinics/clinic/:id',
};

class clinicService extends ApiService {

    getAll = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.GET_ALL_CLINICS)

        return data;
    }

    getClinicalCenter = id => {

        return this.apiClient.delete(ENDPOINTS.GET_CLINIC.replace(":id", id));
    }

}

export const clinicService = new clinicService();