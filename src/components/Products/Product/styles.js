import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      margin: 'auto'
    },
  },
  item: {
    padding: '0px',
  },
  media: {
    height: '100%',
    width: '100%',
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '30px'
  },
}));