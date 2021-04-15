import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FEFEFE",
    },
    secondary: {
      main: '#FFD700',
    },
    error: {
      main: '#dc004e',
    },
    info: {
      main: "#003060"
    }
  },
});
export default theme