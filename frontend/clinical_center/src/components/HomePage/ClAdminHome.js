import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'


function ClAdminHome() {

    return (
      <div>
        admin klinike
         <Sidebar
        // routes={routes}
        // logoText={"Creative Tim"}
        // logo={logo}
        // image={image}
        // handleDrawerToggle={handleDrawerToggle}
        // open={mobileOpen}
        // color={color}
        // {...rest}
      />
      
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
        </GridItem>
      </GridContainer>
    </div>
    );
  }
  
  export default ClAdminHome;