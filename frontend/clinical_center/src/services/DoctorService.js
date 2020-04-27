import ApiService from './ApiService';

const ENDPOINTS = {
  DOCTORS: '/api/doctor',
};

class DoctorService extends ApiService {

  getDoctors = () => {
     return this.apiClient.get(ENDPOINTS.DOCTORS);
  }
}

export const doctorService = new DoctorService();