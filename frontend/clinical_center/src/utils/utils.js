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