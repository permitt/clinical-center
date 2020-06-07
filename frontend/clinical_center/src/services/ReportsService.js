import ApiService from './ApiService';

const ENDPOINTS = {
  CLINIC_REPORTS: '/api/clinics/clinicreports/',
  INCOME: '/api/clinics/income/',
};

class ReportsService extends ApiService {

  getClinicReports = async () => {
    
    const { data } = await this.apiClient.get(ENDPOINTS.CLINIC_REPORTS)

    return data;
  }

  getIncome = async (query) => {
    let queryString = ''
    for (let [key, value] of Object.entries(query)) {
      queryString += `${key}=${value}&`
    }
    queryString = queryString.slice(0,-1)
    const { data } = await this.apiClient.get(ENDPOINTS.INCOME + `?${queryString}`)

    return data;
  }
}

export const reportService = new ReportsService();