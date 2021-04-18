import {useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../lib/actions/dashboard"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { StayCurrentLandscape } from "@material-ui/icons";


/*  const Transition = (props: any) => {
  return <Slide {...props} direction="down" />;
} 
 */

function Alert(props:any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ref = useRef();
  const { isVisible, message, type } = useSelector(
    (state: any) => state.dashboard
  );
  const handleClose = () => {
    dispatch(hideAlert());
  };

  return (
    <div className={classes.root}>
      <Snackbar 
        open={isVisible} 
        autoHideDuration={6000} 
        onClose={handleClose} 
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        //TransitionComponent={() => <Transition />}

      >
        <Alert onClose={handleClose} severity={type} className="notification">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}