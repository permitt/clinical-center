import ApiService from './ApiService';

const ENDPOINTS = {
  APPOINTMENT_TYPES: '/api/clinics/appointment-type/',
  DELETE: '/api/clinics/appointment-type/:id/',
  EDIT: '/api/clinics/appointment-type/:id/',
  ADD: '/api/clinics/appointment-type/'
};

class AppointmentTypeService extends ApiService {

  getTypes = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.APPOINTMENT_TYPES)

    return data;
  }

//   searchHalls = async (query) => {
//     let queryString = ''
//     for (let [key, value] of Object.entries(query)) {
//       queryString += `${key}=${value}&`
//     }
//     queryString = queryString.slice(0,-1)
//     const { data } = await this.apiClient.get(ENDPOINTS.HALLS + `?${queryString}`)

//     return data;
//   }

  deleteType = id => {

    return this.apiClient.delete(ENDPOINTS.DELETE.replace(":id", id));
  }

  addType = async info => {
    const { data } = await this.apiClient.post(ENDPOINTS.ADD, info)

    return data
  }

  editType = async info => {
    const { data } = await this.apiClient.put(ENDPOINTS.EDIT.replace(":id", info.id), info)

    return data
  }
}

export const typeService = new AppointmentTypeService();