import { SET_HALLS, SET_DELETED_HALL, SET_HALL, SET_EDITED_HALL} from '../actions/ActionTypes';

const initialState = {
  all: [],
  reservedDates: []
};
const hallReducer = (state = initialState, action) => {
  let changedArr;
  let hall;
  
  switch (action.type) {
    case SET_HALLS:
      const { halls, reservedDates } = action.payload
      const arr = halls.map(el => {
        const reserved = reservedDates[el.name] || []
        let date = new Date()
        date.setHours(8,0)
        date = passWeekDays(date)
        const availableDate = reserved.length === 0 ? formatDate(date) : findAvailable(reserved)
        el['available'] = availableDate
        return el
      })

      return { ...state, all: arr, reservedDates }

      case SET_DELETED_HALL: 
        changedArr  = state.all.filter(hall => hall.id !== action.payload);

        return {...state, all: changedArr}
      case SET_HALL:
        changedArr  = state.all.slice()
        hall = action.payload
        let date = new Date()
        date.setHours(8,0)
        date = passWeekDays(date)
        hall['available'] = formatDate(date)
        changedArr.push(hall)
        
        return {...state, all: changedArr }

      case SET_EDITED_HALL:
        const { name, number ,id } = action.payload
        const index = state.all.findIndex(hall => hall.id == id);
        changedArr = state.all.slice();
        if (index) {
          hall = {...state.all[index]}
          hall['name'] = name
          hall['number'] = number
          changedArr[index] = hall;
        }
        
        return {...state, all : changedArr};
    default:
      return state;
  }
};

const formatDate = date =>  ('0' + date.getHours()).slice(-2) + ':' +  ('0' + date.getMinutes()).slice(-2) + '  ' + date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) 

const passWeekDays  = date => {
  const weekDay = date.getDay()
  if (weekDay === 6)
    date.setDate(date.getDate() + 2);
  else if (weekDay === 0)
    date.setDate(date.getDate() + 1);

  return date }

const findAvailable = reserved =>  {
  let found = false
  let available = new Date()
  available.setHours(8,0)
  const today = new Date()

  let i = 0
  reserved.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  while (!found && i < reserved.length) {
    const day = new Date(reserved[i].date + 'T'+ reserved[i].time)
    available.setHours(day.getHours(), day.getMinutes())
    if (available < day) {
      found = true
    }
    else {
      i += 1 
      if (day < today) {
        continue
      }
      available.setDate(available.getDate() + 1);
    }
    if (i == 120  && !found) {
      found = true
      available = 'None'
      return ''
    }
  }
  available.setHours(8,0)
  available = passWeekDays(available)

  return formatDate(available)
}

export default hallReducer;