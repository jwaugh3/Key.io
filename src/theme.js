import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2C2C2C',
      light: '#fff'
    },
    secondary: {
      main: '#eb5e34',
    },
  },
  typography: {
      fontFamily: 'Heebo',
      textDecoration: 'none'
  },
  overrides: {
      MuiButton: {
          root: {
              textTransform: 'none',
              fontSize: '14px',
              width: '100%',
              margin: '10px'
          }
      },
      MuiGrid:{
          root: {
            padding: '0px',
            marginLeft: '0px',
            item: {
              paddingLeft: '0px'
            }
          },
          item: {
              padding: '5px !important',
          }
      },
      MuiTypography:{
        root:{
          textDecoration: 'none'
        }
      },
  }
});