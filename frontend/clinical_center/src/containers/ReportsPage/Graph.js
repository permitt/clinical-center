import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label } from 'recharts';


const colors = ['	#FF0000', '#0000FF', '#228B22', '#ffbf00', '#00ff40', '#7e00ff', '#ffff00']
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const legendLabels = {day: 'Daily appointment number' , month: 'Monthly appointment number', week: 'Weekly appointment number'}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

const formatDate = date => {
  const array = date.split('-')
  try {
      const day = array[2]
      const month = array[1]
      return day +'.' + month
  } catch (error) {
    return ''
  }
}


export default  function Graph(props) {
  const { data, property, index } = props
  const color = colors[index] 
  let dataMin = Number.MAX_VALUE
  let dataMax = Number.MIN_VALUE

  data.forEach((appointmentNum => {
    dataMin = appointmentNum.num < dataMin ? appointmentNum.num : dataMin
    dataMax = appointmentNum.num > dataMax ? appointmentNum.num : dataMax
    switch (property) {
      case "day":
        appointmentNum[property] = formatDate(appointmentNum[property])
        break;
      case "month":
        const month = new Date(appointmentNum[property]).getMonth()
        appointmentNum[property] = monthNames[month]
        break;
      case "week":
        let weekStart = new Date(appointmentNum[property])
        let weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 7);
        const start = `${('0' + weekStart.getDate()).slice(-2)}.${('0' + (weekStart.getMonth() + 1)).slice(-2)}`
        const end = `${('0' + weekEnd.getDate()).slice(-2)}.${('0' + (weekEnd.getMonth() + 1)).slice(-2)}`
        appointmentNum[property] = `${start} - ${end}`
      default:
        break;
    }
      
    

  }))


  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${capitalize(property)} ${label} : ${payload[0].payload.num}`} </p>
        </div>
      );
    }
  
    return null;
  }

  return (
    <LineChart width={600} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line name={legendLabels[property]} type="monotone" dataKey="num" stroke={color}/>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey={property} dy={5}>
    <Label
      value={capitalize(property)}
      position="insideBottomRight"
      fontSize={18}
      fill='#283593'
      align='right'
      offset={-15}
        />
    </XAxis>
    <Legend align="center"/>
    <YAxis 
      dx={-5} 
      type="number"
      domain={[dataMin - 10, dataMax + 10]}
      dataKey="num"
        >
    <Label
      value={"Number of appointments"}
      fontSize={18}
      fill='#283593'
      align='center'
      angle={270}
      dx={-19}
        />
    </YAxis>
    <Tooltip content={<CustomTooltip />} wrapperStyle={{ width: 150, backgroundColor: '#ccc' }} />
  </LineChart>
)}
