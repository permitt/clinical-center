import { SET_HALLS, SET_DELETED_HALL, SET_HALL } from '../actions/ActionTypes';

const initialState = {
  all: [],
  reservedDates: []
};
const hallReducer = (state = initialState, action) => {
  let changedArr;
  
  switch (action.type) {
    case SET_HALLS:
      const { halls, reservedDates } = action.payload
      const arr = halls.map(el => {
        const reserved = reservedDates[el.name] || []
        const availableDate = reserved.length === 0 ? formatDate(new Date()) : findAvailable(reserved)
        el['available'] = availableDate
        return el
      })

      return { ...state, all: arr, reservedDates }

      case SET_DELETED_HALL: 
        changedArr  = state.all.filter(hall => hall.id !== action.payload);

        return {...state, all: changedArr}
      case SET_HALL:
        changedArr  = state.all.slice()
        let hall = action.payload
        hall['available'] = formatDate(new Date())
        changedArr.push(hall)
  
        return {...state, all: changedArr }
    
    default:
      return state;
  }
};

const formatDate = date =>  date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)

const findAvailable = reserved =>  {
  let found = false
  let available = new Date()
  let i = 0
  reserved.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  while (!found) {
    const day = new Date(reserved[i].date)
    if (available < day) {
      available = formatDate(available)
      found = true
    }
    else {
      i += 1 
      available.setDate(day.getDate() + 1)
    }
    if (i == 20  && !found) {
      found = true
      available = 'None'
    }
  }

  return available
}

export default hallReducer;