import ApiService from './ApiService';

const ENDPOINTS = {
  HALLS: '/api/clinics/operatingroom'
};

class HallService extends ApiService {

  getHalls = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.HALLS)

    return data;
  }
}

export const hallService = new HallService();