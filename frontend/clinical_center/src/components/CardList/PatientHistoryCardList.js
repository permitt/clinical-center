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
    const [open, setOpen] = React.useState(false);
    const [sortByOpen, setSortByOpen] = React.useState(false);
    const [sortByAnchor, setSortByAnchor] = React.useState(null);
    const [searchInput, setSearchInput] = React.useState('')

    const handleChange = event => {
        setSearchInput(event.target.value)
        props.search(event.target.value)
    }


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSortClick = (val) => {
        setSortByOpen(false);
        setSortByAnchor(null);
        props.changeSortBy(val);

    }

    useEffect(() => {
        setOpen(false);
        setSortByOpen(false);
    }, [props])

    return (
        <Toolbar className={classes.root}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                {props.title}
            </Typography>
            <TextField
                id="standard-search"
                type="search"
                value={searchInput || ""}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }} />
            <IconButton aria-label="sort list" onClick={(e) => { setSortByAnchor(e.currentTarget); setSortByOpen(true) }}>
                <SortIcon />
            </IconButton>
            <Menu
                id="sort-menu"
                keepMounted
                anchorEl={sortByAnchor}
                open={sortByOpen}
                onClose={() => { setSortByOpen(false); }}
            >
                <MenuItem disabled >Sort by</MenuItem>
                {props.sortOptions.map(sortBy => (
                    <div>
                        <MenuItem key={sortBy + 'asc'} onClick={() => handleSortClick(sortBy)}>{sortBy} ascending</MenuItem>
                        <MenuItem key={sortBy + 'desc'} onClick={() => handleSortClick('-' + sortBy)}>{sortBy} descending</MenuItem>
                    </div>
                ))}


            </Menu>


        </Toolbar >
    );
};



export default function SimpleTable(props) {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = props.data
    const [filteredData, setFilteredData] = React.useState(rows)
    const columns = props.columns

    useEffect(() => {
        setFilteredData(rows)
    }, [props])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const search = name => {
        name = name.toLowerCase()
        const columnLabels = columns.map(column => column.id.toLowerCase())
        const data = rows.filter(row => {
            for (const property in row) {
                if (!(columnLabels.includes(property.toLowerCase())))
                    continue;
                if (String(row[property]).toLowerCase().startsWith(name))
                    return true
            }
            return false
        })
        setFilteredData(data)
    }
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Paper style={{ width: 500, marginLeft: 100, padding: 40 }}>
            <TableToolbar
                title={props.title}
                form={props.form}
                sortOptions={props.sortOptions}
                changeSortBy={props.changeSortBy}
                search={search} />


            <Typography variant="h5" component="h2">
                {props.data.length === 0 ? "Searching..." : props.data === false ? "You don't have a medical history."

                    : props.data.map(cl => {
                        if (cl.type === 'appointment') {
                            return (

                                <Card className={classes.root} style={{ margin: 10 }}>
                                    <CardContent>

                                        <Typography variant="h5" component="h2">
                                            Appointment
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {cl.date} {cl.time}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Doctor's email: {cl.doctor}

                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Leave a rating for the doctor:
                                        </Typography>
                                        <Typography variant="body2" component="p"><br />
                                            <Rating size="medium" name="half-rating-read" precision={0.5} />
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Price: {cl.price}.00$

                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Discount: {cl.discount}%

                                        </Typography>

                                        <Typography variant="body2" component="p">
                                            Clinic: {cl.clinic_name}

                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Leave a rating for the clinic:
                                        </Typography>

                                        <Typography variant="body2" component="p"><br />
                                            <Rating size="medium" name="moj" precision={0.5} />
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={(e) => props.action(cl.id)} size="medium">{cl.button}</Button>
                                    </CardActions>
                                </Card>
                            );
                        }
                        else {
                            return (
                                <Card></Card>
                            );
                        }


                    }
                    )}
            </Typography>

        </Paper>
    );
}