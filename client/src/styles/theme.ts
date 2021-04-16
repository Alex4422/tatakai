import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#111015",
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