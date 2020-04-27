import React from 'react';

import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import GroupIcon from '@material-ui/icons/Group';

import Sidebar from "../../components/Sidebar/Sidebar"


export default function ClAdminHome({...rest}) {

  const [renderTable, setRenderTable ] =  React.useState(false)

  const showDoctorList = () => {

    setRenderTable(true)
  }

  const sidebarOptions =  [ 
    {
      name: 'Doctors',
      onClick: showDoctorList,
      icon: GroupIcon
    },
    {
      name: 'Some other option',
      onClick: showDoctorList,
      icon: ''
    }
  ]
  return (
    <div>
      <Sidebar options={sidebarOptions} />
    <div> 
      nesto
      {/* {renderTable && <Table />} */}
    </div>
  </div>
  );
}