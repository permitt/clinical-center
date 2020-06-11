import { GET_HEALTH_CARD, SET_HEALTH_CARD } from './ActionTypes'

export const getHealthCard = (payload=null) => {
    return {
        type: GET_HEALTH_CARD,
        payload
    };
}

export const setHealthCard = payload => {
    return {
        type: SET_HEALTH_CARD,
        payload
    }
}