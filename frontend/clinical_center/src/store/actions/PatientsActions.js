import {
  GET_PATIENTS,
  SET_PATIENTS,
  GET_PATIENT,
  SET_PATIENT,
  PUT_PATIENT,

} from './ActionTypes';

export const getPatients = payload => {
  return {
    type: GET_PATIENTS,
    payload
  };
};

export const setPatients = payload => {
  return {
    type: SET_PATIENTS,
    payload
  };
};

export const getPatient = payload => {
  return {
    type: GET_PATIENT,
    payload
  };
};

export const setPatient = payload => {
  return {
    type: SET_PATIENT,
    payload
  };
};

export const putPatient = payload => {
  return {
    type: PUT_PATIENT,
    payload
  }
}