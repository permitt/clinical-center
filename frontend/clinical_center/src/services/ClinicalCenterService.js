import ApiService from './ApiService';

const ENDPOINTS = {
    CLINICAL_CENTER: '/api/clinics/clinic/',
    GET: '/api/clinics/clinic/:id',
};

class ClinicalCenterService extends ApiService {

    getAll = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.CLINICAL_CENTER)

        return data;
    }

    getClinicalCenter = id => {

        return this.apiClient.delete(ENDPOINTS.GET.replace(":id", id));
    }

}

export const clinicalCenterService = new ClinicalCenterService();