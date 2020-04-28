import ApiService from './ApiService';

const ENDPOINTS = {
  DOCTORS: '/api/doctor',
  DELETE: '/api/doctor/:email',
  ADD : '/api/doctor/'
};

class DoctorService extends ApiService {

  getDoctors = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.DOCTORS)

     return data;
  }

  deleteDoctor = email => {

    return this.apiClient.delete(ENDPOINTS.DELETE.replace(":email", email));
 }

  addDoctor = async info => {
    const { data } = await this.apiClient.post(ENDPOINTS.ADD, info)

    return data
  }
}

export const doctorService = new DoctorService();