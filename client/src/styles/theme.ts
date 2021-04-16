import { createMuiTheme } from '@material-ui/core/styles';
import nude from '../assets/fond_nude.png';

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
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundImage: `url(${nude})`,
          backgroundRepeat: 'round',
          backgroundSize: 'contain'
        },
      },
    },
  },
});
export default theme