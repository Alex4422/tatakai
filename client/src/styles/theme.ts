import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


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