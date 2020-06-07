import ApiService from './ApiService';

const ENDPOINTS = {
  REQUESTS: '/api/clinics/holiday/',
  RESOLVE: '/api/clinics/holiday/resolve/:id/'
};

class HolidayService extends ApiService {

  getRequests = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.REQUESTS)

    return data;
  }
  resolveRequest = async info => {
    const { data } = await this.apiClient.post(ENDPOINTS.RESOLVE.replace(":id", info.id), info)

    return data
  }

  createRequest = async info => {
    const { data } = await this.apiClient.post(ENDPOINTS.REQUESTS, info)

    return data
  }
}

export const holidayService = new HolidayService();