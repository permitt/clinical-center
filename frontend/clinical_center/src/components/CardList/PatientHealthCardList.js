import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SortIcon from '@material-ui/icons/Sort';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import toolbarStyles from "../../assets/jss/material-dashboard-react/components/tableToolbarStyle"

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';



let useStyles = makeStyles(styles);
const useToolbarStyles = makeStyles(toolbarStyles)


const TableToolbar = props => {
    const classes = useToolbarStyles();


    return (
        <Toolbar className={classes.root}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                {props.title}
            </Typography>



        </Toolbar >
    );
};



export default function SimpleTable(props) {

    const classes = useStyles();


    return (
        <Paper style={{ width: 500, marginLeft: 100, padding: 40 }}>
            <TableToolbar
                title={props.title}
            />


            <Typography variant="h5" component="h2">

                {props.data[0] === undefined ? "Searching..." : props.data[0].reports.length === 0 ? "Your health card is empty."

                    : props.data.map(cl => (
                        <div>


                            {cl.reports.map(el => (
                                <Card className={classes.root} style={{ margin: 10 }}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            Diagnosis
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            Type: {el.type}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Description: {el.description}

                                        </Typography>
                                    </CardContent>
                                </Card>

                            ))}


                        </div>


                    )
                    )}
            </Typography>

        </Paper>
    );
}