import React from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { CLINIC_ADMIN, PATIENT, DOCTOR } from '../../utils/constants'
import ClAdminHome from '../HomePage/ClAdminHome'
import PatientHome from '../HomePage/PatientHome'
import DoctorHome from '../HomePage/DoctorHome'

export function Dashboard({ role }) {
    return (
    <div>
        { role === DOCTOR && <DoctorHome />}
        { role === CLINIC_ADMIN && <ClAdminHome />}
        { role === PATIENT && <PatientHome />}
    </div>
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