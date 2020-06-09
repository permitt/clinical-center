import ApiService from './ApiService';

const ENDPOINTS = {
  DOCTORS: '/api/users/doctor/',
  DELETE: '/api/users/doctor/:email/',
  ADD: '/api/users/doctor/'
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

  searchDoctors = async (query) => {
    let queryString = ''
    for (let [key, value] of Object.entries(query)) {
      queryString += `${key}=${value}&`
    }
    queryString = queryString.slice(0,-1)
    const { data } = await this.apiClient.get(ENDPOINTS.DOCTORS + `?${queryString}`)

    return data;
  }
}

export const doctorService = new DoctorService();