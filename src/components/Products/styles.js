import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    marginTop: '70px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: '0 10%',
    maxWidth: '100%',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
      margin: 'auto',
      marginLeft: '0px'
    },
  },
  root: {
    flexGrow: 1,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: 'auto'
    },
  },
  filterContainer: {
    backgroundColor: '#2C2C2C',
    display: 'inline-block',
    margin: 'auto',
    borderRadius: '6px',
    padding: '0 8px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  checkboxContainer: {
    marginTop: '5px',
    padding: '0 12px',
  },
  productGrid: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px !important',
    },
  }
}));