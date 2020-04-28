import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import LocalHospital from '@material-ui/icons/LocalHospital';
import Favorite from '@material-ui/icons/Favorite';
import Healing from '@material-ui/icons/Healing';
import Person from '@material-ui/icons/Person';
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../components/Sidebar/Sidebar"
import Table from "../../components/Table/Table"
import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import { getClinicalCenters } from '../../store/actions/ClinicalCenterActions';
import { ADD } from '../../utils/constants'


const useStyles = makeStyles(styles);

const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 80 },
    { id: 'city', label: 'City', minWidth: 80 },
    { id: 'country', label: 'Country', minWidth: 80 },
    { id: 'description', label: 'Description', minWidth: 90 },
];


function ClAdminHome(props) {
    const classes = useStyles();
    const [renderTable, setRenderTable] = React.useState(false)

    const showClinicalCenters = () => {
        props.getClinicalCenters()
        setRenderTable(true)
    }

    const action = (type, email) => {
        if (type === ADD) {
            props.deleteDoctor(email)
        }

    }
    const sidebarOptions = [
        {
            name: 'Clinical Centers',
            onClick: showClinicalCenters,
            icon: LocalHospital
        },
        {
            name: 'Health Card',
            onClick: showClinicalCenters,
            icon: Favorite
        },
        {
            name: 'Medical History',
            onClick: showClinicalCenters,
            icon: Healing
        },
        {
            name: 'Profile',
            onClick: showClinicalCenters,
            icon: Person
        }
    ]
    return (
        <>
            <div className={classes.wrapper}>
                <Sidebar options={sidebarOptions} />
                <div className={classes.mainPanel}>
                    <div className={classes.table}>
                        {renderTable && <Table
                            data={props.clinicalCenters}
                            columns={columns}
                            action={action}
                            title="Clinical Centers" />
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        clinicalCenters: state.clinicalCenter.all
    };
};

const mapDispatchToProps = {
    getClinicalCenters,
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ClAdminHome)
);