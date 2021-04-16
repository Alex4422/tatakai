import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SvgIcon from '@material-ui/core/SvgIcon';
import Logo from "../assets/logo_fond_noir.svg";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
  appBar: {
    backgroundColor: "transparent",
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
  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px"
  },
  linkDisabled: {
    color: "white",
    textDecoration: "none",
    opacity: "0.5",
    cursor: "not-allowed",
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
              <li>
                <Link
                  className={classes.link}
                  to="/marketplace"
                >
                  MarketPlace
                </Link>
              </li>
              <li>
                <Link
                  className={classes.link}
                  to="/cards"
                >
                  My Cards
                </Link>
              </li>
              <li>
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
              {!isAdmin 
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
    </div>
  );
}
export default Navbar;
