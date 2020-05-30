export const formatHours = mins => {
    const hours = Math.floor(mins / 60);  
    const minutes = mins % 60;
    return ('0' + hours).slice(-2) + " : " + ('0' + minutes).slice(-2) + " h";    
  }


export const formatValues = values => {
    const newValues = {...values}
    const { duration } = newValues
    let minutes = 0
    try{
       minutes = parseInt(duration.split(":")[0]) * 60 + parseInt(duration.split(":")[1].split(" ")[1])
    } catch{
      newValues['duration'] = minutes
      return newValues
    }
    newValues['duration'] = minutes
  
    return newValues
  }

export const convertTime = (time12h) => {
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
  }

  export const formatDate = date =>  date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)