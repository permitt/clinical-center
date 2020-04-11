import React from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { CLINIC_ADMIN, PATIENT, DOCTOR } from '../../utils/constants'
import ClAdminHome from '../../components/HomePage/ClAdminHome'
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";

const homePage = role => {
    switch(role) {
        case CLINIC_ADMIN:
           return <ClAdminHome />
        case PATIENT:
            return null
        case DOCTOR:
            return null
        default:
           return null
    }
}

export function Dashboard({ role }) {
  
    console.log(role)
    return (
    <div> nesto nmnogo jako</div>
        
    )
}


Dashboard.propTypes = {
    role: PropTypes.string
};
  
const mapStateToProps = state => {
    return {
        role: state.authUser.role 
    };
};
  
const withConnect = connect(mapStateToProps);
  
export default compose(withConnect)(Dashboard);