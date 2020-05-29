import React from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Helmet } from 'react-helmet';

import { PATIENT, ADMIN } from '../../utils/constants'
import EditProfile from './EditProfile'
import PatientProfile from './PatientProfile'

export function Profile({ role }) {

    return (
        <div>
            <Helmet>
                <title>Edit Profile</title>
            </Helmet>
            {role !== PATIENT && role !== ADMIN && <EditProfile />}
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