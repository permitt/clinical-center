import ApiService from './ApiService';

const ENDPOINTS = {
    HEALTH_CARD: '/api/clinics/health-card/'
}

class HealthCardService extends ApiService {

    getHealthCard = async (patient=null) => {
        const url = patient ? ENDPOINTS.HEALTH_CARD + `?patient=${patient.email}`: ENDPOINTS.HEALTH_CARD
        const { data } = await this.apiClient.get(url);

        return data;
    }
}

export const healthCardService = new HealthCardService();