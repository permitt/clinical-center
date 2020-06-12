import ApiService from './ApiService';

const ENDPOINTS = {
  HALLS: '/api/clinics/operatingroom/',
  DELETE: '/api/clinics/operatingroom/:id/',
  EDIT: '/api/clinics/operatingroom/:id/',
  ADD: '/api/clinics/operatingroom/',
  ASSIGN: '/api/clinics/operatingroom/assign/'
};

class HallService extends ApiService {

  getHalls = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.HALLS)

    return data;
  }

  searchHalls = async (query) => {
    let queryString = ''
    for (let [key, value] of Object.entries(query)) {
      queryString += `${key}=${value}&`
    }
    queryString = queryString.slice(0,-1)
    const { data } = await this.apiClient.get(ENDPOINTS.HALLS + `?${queryString}`)

    return data;
  }

  deleteHall = id => {

    return this.apiClient.delete(ENDPOINTS.DELETE.replace(":id", id));
  }

  addHall = async info => {
    const { data } = await this.apiClient.post(ENDPOINTS.ADD, info)

    return data
  }

  editHall = async info => {
    const { data } = await this.apiClient.put(ENDPOINTS.EDIT.replace(":id", info.id), info)

    return data
  }

  assignHall = async info => {
    const { data } = await this.apiClient.post(ENDPOINTS.ASSIGN, info)

    return data
  }
}

export const hallService = new HallService();