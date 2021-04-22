import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../lib/actions/dashboard"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

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
        autoHideDuration={4000} 
        onClose={handleClose} 
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <Alert onClose={handleClose} severity={type} className="notification">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}