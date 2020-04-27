import ApiService from './ApiService';

const ENDPOINTS = {
  DOCTORS: '/api/doctor',
  DELETE: '/api/doctor/:email'
};

class DoctorService extends ApiService {

  getDoctors = () => {
     return this.apiClient.get(ENDPOINTS.DOCTORS);
  }

  deleteDoctor = email => {
    return this.apiClient.delete(ENDPOINTS.DELETE.replace(":email", email));
 }
}

export const doctorService = new DoctorService();