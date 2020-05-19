import React from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Helmet } from 'react-helmet';

import { CLINIC_ADMIN, PATIENT, DOCTOR } from '../../utils/constants'
import ClAdminHome from '../HomePage/ClAdminHome'
import PatientProfile from './PatientProfile'
import DoctorHome from '../HomePage/DoctorHome'

export function Profile({ role }) {

    return (
        <div>
            <Helmet>
                <title>Edit Profile</title>
            </Helmet>
            {role === DOCTOR && <DoctorHome />}
            {role === CLINIC_ADMIN && <ClAdminHome />}
            {role === PATIENT && <PatientProfile />}
        </div>
    )
}

Profile.propTypes = {
    role: PropTypes.string
};

const mapStateToProps = state => {
    return {
        role: state.authUser.role
    };
};

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Profile);