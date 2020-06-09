import { GET_HEALTH_CARD, SET_HEALTH_CARD } from './ActionTypes'

export const getHealthCard = () => {
    return {
        type: GET_HEALTH_CARD
    };
}

export const setHealthCard = payload => {
    return {
        type: SET_HEALTH_CARD,
        payload
    }
}