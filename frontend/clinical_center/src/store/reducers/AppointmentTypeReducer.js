import { SET_TYPES, SET_DELETED_TYPE, SET_TYPE, SET_EDITED_TYPE } from '../actions/ActionTypes';

const initialState = {
  all: []
};
const typeReducer = (state = initialState, action) => {
  let changedArr;
  let type;
  switch (action.type) {

    case SET_TYPES:

      return { ...state, all: action.payload }

      case SET_DELETED_TYPE: 
        changedArr  = state.all.filter(type => type.id !== action.payload);

        return {...state, all: changedArr}
      case SET_TYPE:
        changedArr  = state.all.slice()
        type = action.payload
        changedArr.push(type)
  
        return {...state, all: changedArr }

      case SET_EDITED_TYPE:
        const { typeName, duration , price, id } = action.payload
        const index = state.all.findIndex(type => type.id == id);
        changedArr = state.all.slice();
        if (index) {
          type = {...state.all[index]}
          type['typeName'] = typeName
          type['duration'] = duration
          type['price'] = price
          changedArr[index] = type;
        }
        
        return {...state, all : changedArr};
    default:
      return state;
  }
};

export default typeReducer;