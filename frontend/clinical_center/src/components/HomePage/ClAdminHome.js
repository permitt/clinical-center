import React from 'react';

import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'


import Sidebar from "../Sidebar/Sidebar"


export default function ClAdminHome({...rest}) {

  const [renderTable, setRenderTable ] =  React.useState(false)

  const showClinics = () => {
    setRenderTable(true)
  }

  //izmeniti ovo dole sluzi samo kao primer, dodati ikonu
  const sidebarOptions =  [ 
    {
      name: 'All clinics',
      onClick: showClinics,
      icon: ''
    },
    {
      name: 'Some other option',
      onClick: showClinics,
      icon: ''
    }
  ]
  return (
    <div>
      <Sidebar options={sidebarOptions} />
    <div> 
      nesto
      {/* //otkomentarisati kod ispod kad se doda komponenta table */}
      {/* {renderTable && <Table />} */}
    </div>
  </div>
  );
}