import { GET_CLINIC_REPORTS, SET_CLINIC_REPORTS, GET_INCOME, SET_INCOME } from './ActionTypes';
  
  export const getClinicReports = () => {
    return {
      type: GET_CLINIC_REPORTS
    };
  };
  
  export const setClinicReports = payload => {
    return {
      type: SET_CLINIC_REPORTS,
      payload
    };
  };
  
  export const getIncome = payload => {
    return {
      type: GET_INCOME,
      payload
    };
  };
  
  export const setIncome = payload => {
    return {
      type: SET_INCOME,
      payload
    };
  };