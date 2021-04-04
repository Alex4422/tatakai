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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  },
}));

function Navbar() {
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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link style={{ color: "white", textDecoration: "none" }} to="/">
              NFT - TAKAKAI{" "}
            </Link>
          </Typography>

          <ul
            style={{
              listStyleType: "none",
              width: "15%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <li>
              {" "}
              <Link style={{ color: "white", textDecoration: "none" }} to="/">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/admin"
              >
                Admin
              </Link>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;
