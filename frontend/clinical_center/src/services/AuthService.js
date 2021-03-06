import ApiService from './ApiService'
import jwt_decode from 'jwt-decode'
import { DOCTOR, NURSE, CLINIC_ADMIN } from '../utils/constants'

const ENDPOINTS = {
  LOGIN: 'api/users/token/obtain/',
  PROFILE: 'api/users/profile/',
  REGISTER: 'api/users/patient/',
  CHANGEPASS: 'api/users/changepass/',
  DOCTOR: '/api/users/doctor/:email/',
  NURSE: '/api/users/nurse/:email/',
  CLINICADMIN: '/api/users/clinicadmin/:email/'
};

class AuthService extends ApiService {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    const token = this.getToken();
    const user = this.getUser();

    if (token && user) {
      this.setAuthorizationHeader();
      this.api.setUnauthorizedCallback(this.destroySession.bind(this));
    }
  };

  setAuthorizationHeader = () => {
    const token = this.getToken();
    if (token) {
      this.api.attachHeaders({
        Authorization: `JWT ${token}`
      });
    }
  };

  createSession = user => {
    localStorage.setItem('user', JSON.stringify(user))
    this.setAuthorizationHeader()
  };

  destroySession = () => {
    localStorage.clear()
    this.api.removeHeaders(['Authorization'])
  };

  login = async loginData => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, loginData)
    this.createSession(data)
    return data
  };

  signup = async signupData => {
    console.log(signupData);
    const { data } = await this.apiClient.post(ENDPOINTS.REGISTER, signupData)
    return data
  };

  changePass = async info => {
    const { data } = await this.apiClient.post(ENDPOINTS.CHANGEPASS, info)

    return data.changed
  };

  logout = () => {
    this.destroySession()
    return { ok: true }
  };

  getToken = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user).access : undefined
  };

  getExpirationDate = jwtToken => {
    if (!jwtToken) {
      return null;
    }
    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

    return jwt && jwt.exp && jwt.exp * 1000;
  };

  isExpired = (exp) => {
    if (!exp) {
      return false;
    }

    return Date.now() > exp;
  };

  isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    return user && user.access ? !this.isExpired(this.getExpirationDate(user.access)) : false
  };

  getUser = () => {
    const user = localStorage.getItem('user')
    return JSON.parse(user)
  };

  getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    let decodedToken;
    try {
      decodedToken = jwt_decode(user.access)
    } catch (error) {
      console.log(error)
      return null
    }

    return decodedToken.role
  }

  isPassChanged = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    let decodedToken;
    try {
      decodedToken = jwt_decode(user.access)
    } catch (error) {
      console.log(error)
      return null
    }

    return decodedToken.changedPass !== undefined ? decodedToken.changedPass : true
  }

  getUserEmail = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    let decodedToken;
    try {
      decodedToken = jwt_decode(user.access)
    } catch (error) {
      console.log(error)
      return null
    }

    return decodedToken.email
  }

  updateUserInStorage = property => {
    const user = localStorage.getItem('user')
    let jsonUser = JSON.parse(user)
    jsonUser = { ...jsonUser, ...property }
    localStorage.setItem('user', JSON.stringify(jsonUser))
  };

  getUserProfile = async loginData => {
    const { data } = await this.apiClient.get(ENDPOINTS.PROFILE)

    return data
  };

  editProfile = async info => {
    console.log('u service')
    let response;
    console.log(this.getUserRole())
    switch (this.getUserRole()) {
      case DOCTOR:
        response = await this.apiClient.put(ENDPOINTS.DOCTOR.replace(':email', this.getUserEmail()), info);
        break;
      case CLINIC_ADMIN:
        response = await this.apiClient.put(ENDPOINTS.CLINICADMIN.replace(':email', this.getUserEmail()), info);
        break;

      default:
        break;
    }


    return response.data
  };
}

const authService = new AuthService()
export default authService