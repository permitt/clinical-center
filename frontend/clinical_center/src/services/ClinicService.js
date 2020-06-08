import ApiService from './ApiService';

const ENDPOINTS = {
    GET_ALL_CLINICS: '/api/clinics/clinic/?ordering=',
    GET_CLINIC: '/api/clinics/clinic/:id',
    GET_ADMIN_CLINIC: '/api/clinics/adminclinic/',
    EDIT_ADMIN_CLINIC: '/api/clinics/clinic/:id/'
};

class clinicServiceApi extends ApiService {

    getAll = async (orderBy) => {
        const { data } = await this.apiClient.get(ENDPOINTS.GET_ALL_CLINICS + orderBy)

        return data;
    }

    getClinic = id => {

        return this.apiClient.delete(ENDPOINTS.GET_CLINIC.replace(":id", id));
    }

    getAdminClinic = () => {

        return this.apiClient.get(ENDPOINTS.GET_ADMIN_CLINIC);
    }

    editAdminClinic = (data) => {

        return this.apiClient.patch(ENDPOINTS.EDIT_ADMIN_CLINIC.replace(":id", data.id),data);
    }


}

export const clinicService = new clinicServiceApi();