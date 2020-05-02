import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import LocalHospital from '@material-ui/icons/LocalHospital';
import Favorite from '@material-ui/icons/Favorite';
import Healing from '@material-ui/icons/Healing';
import Person from '@material-ui/icons/Person';
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from '@material-ui/core/Modal';
import Table from "../../components/Table/Table"
import styles from "../../assets/jss/material-dashboard-react/layouts/homeStyle.js";
import { getClinics } from '../../store/actions/ClinicActions';
import { ADD } from '../../utils/constants'


const useStyles = makeStyles(styles);

const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 80 },
    { id: 'city', label: 'City', minWidth: 80 },
    { id: 'country', label: 'Country', minWidth: 80 },
    { id: 'description', label: 'Description', minWidth: 90 },
];


function PatientHome(props) {
    const classes = useStyles();
    const [renderTable, setRenderTable] = React.useState(false)
    const [orderBy, setOrderBy] = React.useState('name')

    const orderByOptions = ['name', 'address', 'city', 'country'];

    const showClinicalCenters = () => {
        props.getClinics(orderBy)
        setRenderTable(true)
    }

    React.useEffect(() => {
        props.getClinics(orderBy);
    }, [orderBy])

    const action = (type, email) => {
        if (type === ADD) {
            props.deleteDoctor(email)
        }

    }
    const sidebarOptions = [
        {
            name: 'Clinics',
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
                            data={props.clinics}
                            columns={columns}
                            action={action}
                            sortOptions={orderByOptions}
                            changeSortBy={val => setOrderBy(val)}
                            title="Clinics" />
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        clinics: state.clinic.all
    };
};

const mapDispatchToProps = {
    getClinics,
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PatientHome)
);