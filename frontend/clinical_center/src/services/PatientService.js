import ApiService from './ApiService';

const ENDPOINTS = {
  PATIENTS: '/api/users/patient/',
  PATIENT: '/api/users/patient/:email/',
};

class PatientService extends ApiService {

  getPatients = async (sortQuery) => {
    const url = sortQuery ? ENDPOINTS.PATIENTS + '?ordering=' + sortQuery['sort'] : ENDPOINTS.PATIENTS
    const { data } = await this.apiClient.get(url)

    return data;
  }

  getPatient = async (email) => {
    const { data } = await this.apiClient.get(ENDPOINTS.PATIENT.replace(':email', email));

    return data;
  }

  putPatient = async (patient) => {
    const { data } = await this.apiClient.put(ENDPOINTS.PATIENT.replace(':email', patient.email), patient);

    return data;
  }

  searchPatients = async (query) => {
    let queryString = ''
    for (let [key, value] of Object.entries(query)) {
      queryString += `${key}=${value}&`
    }
    queryString = queryString.slice(0,-1)
    const { data } = await this.apiClient.get(ENDPOINTS.PATIENTS + `?${queryString}`)



    return data;
  }

}

export const patientService = new PatientService();