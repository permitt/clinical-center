import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Image from "../../assets/img/sidebar-3.jpg"
import Logo from "../../assets/img/reactlogo.png";
import styles from "../../assets/jss/material-dashboard-react/components/sidebarStyle.js";
import { logOut } from '../../store/actions/AuthActions';

const useStyles = makeStyles(styles);

function Sidebar(props) {
  const classes = useStyles();
 
  const whiteFontClasses = classNames(classes.whiteFont);
  const { options } = props;
  var links = (
    <List className={classes.list}>
      {options.map((prop, key) => {

        return (
          <div className={classes.item} key={key} >
            <ListItem button className={classes.itemLink} onClick={prop.onClick}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                />
              )}
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          </div>
        );
      })}
      <div key='logout' style={{position: 'absolute',right:0,bottom:0}} >
        <ListItem button className={classes.itemLink} onClick={props.logOut} 
          >
            <Icon className={classNames(classes.itemIcon, whiteFontClasses)}>
              <ExitToAppIcon />
            </Icon>
          <ListItemText
            primary="Logout"
            className={classNames(classes.itemText, whiteFontClasses)}
            disableTypography={true}
          />
        </ListItem>
      </div>
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <div className={classes.logoLink }>   
        <div className={classes.logoImage}>
          <img src={Logo} alt="logo" className={classes.img} />
        </div>
        Jungle groove
      </div>
    </div>
  );
  return (
    <div>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {Image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + Image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
};


const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = { logOut };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Sidebar)
);