import React from 'react';

import Sidebar from "../../components/Sidebar/Sidebar"

export default function DoctorHome({...rest}) {

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
      {/* {renderTable && <Table data={} columns={columns} action={action} title={}/>} */}
    </div>
  </div>
  );
}