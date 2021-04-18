import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Logo from "../assets/logo_fond_noir.svg";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/AddPhotoAlternate';
import StoreIcon from '@material-ui/icons/Storefront';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOnOutlined';
import Notifications from "./Notifications";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "0px 2px 4px -1px rgb(255, 255, 255),0px 4px 5px 0px rgba(255,255,255,0.14),0px 1px 20px 10px rgba(255,255,255,0.1)"
  },
  
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menu: {
    display: "flex",
  },
  menuItem: {
    display:"flex",
    alignItems:"center",
    padding: "0 15px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    fontSize: "17px",
    '&:hover': {
      color: theme.palette.secondary.main,
      transition: "all .25s"
    }
  },
  linkDisabled: {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    opacity: "0.5",
    cursor: "not-allowed",
    fontSize: "17px"
  },
}));


declare interface Props {
  isAdmin: boolean;
}

function Navbar({isAdmin}: Props) {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event: any) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          {/* <Typography variant="h6" className={classes.title}> */}
            <Link style={{ color: "white", textDecoration: "none" }} to="/">
              <img src={Logo} alt="Logo" width="35px"/>
            </Link>
          {/* </Typography> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              fontVariant: "petite-caps",
            }}
          >
            <ul
              style={{
                listStyleType: "none",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <li className={classes.menuItem}>
              <StoreIcon/> 
                <Link
                  className={classes.link}
                  to="/marketplace"
                >
                MarketPlace
                </Link>
              </li>
              <li className={classes.menuItem}>
              <FavoriteBorderIcon/>
                <Link
                  className={classes.link}
                  to="/cards"
                >
                  My Cards
                </Link>
              </li>
              <li className={classes.menuItem}>
              <MonetizationOnIcon/>
                <Link
                  className={classes.linkDisabled}
                  to="/"
                >
                  Bid
                </Link>
              </li>
            </ul>

            <ul
              style={{
                listStyleType: "none",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {isAdmin 
              ? <li>
                <Link
                  className={classes.link}
                  to="/admin"
                >
                <AddIcon fontSize="large"/>
                </Link>
              </li>
              : null}
             
              <li>
                <Link
                  className={classes.link}
                  to="/profile"
                >
                  <AccountCircleIcon fontSize="large"/>
                </Link>
              </li>
            </ul>
          </div>
        </Toolbar>
      </AppBar>
    <Notifications />
    </div>
  );
}
export default Navbar;
