import ApiService from './ApiService';

const ENDPOINTS = {
    OPERATION: '/api/clinics/operation/',
}

class OperationService extends ApiService {

    getOperations = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.OPERATION);
        return data;
    }
}

export const operationService = new OperationService();