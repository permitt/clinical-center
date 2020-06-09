import ApiService from './ApiService';

const ENDPOINTS = {
    HEALTH_CARD: '/api/clinics/health-card/'
}

class HealthCardService extends ApiService {

    getHealthCard = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.HEALTH_CARD);

        return data;
    }
}

export const healthCardService = new HealthCardService();