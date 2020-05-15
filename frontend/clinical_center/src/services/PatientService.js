import ApiService from './ApiService';

const ENDPOINTS = {
  PATIENTS: '/api/users/patient/'
};

class PatientService extends ApiService {

  getPatients = async (sortQuery) => {
    const url = sortQuery ? ENDPOINTS.PATIENTS + '?ordering=' + sortQuery['sort'] : ENDPOINTS.PATIENTS
    const { data } = await this.apiClient.get(url)

    return data;
  }

}

export const patientService = new PatientService();