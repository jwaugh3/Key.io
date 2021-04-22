import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginTop: '35px',
      },
      gridList: {
        width: '100%',
        height: 600,
        overflow: 'hidden'
      },
      image: {
        objectFit: 'cover',
        width: '100%',
        height: '70vh',
        zIndex: '1'
      },
      container:{
        height: '80vh',
        width: '100%',
        display: 'grid',
        gridTemplateRows: '70% 30%',
        gridTemplateColumns: '1fr 1fr 1fr',
        [theme.breakpoints.down('md')]: {
          gridTemplateColumns: '1fr',
          margin: '5px'
        },
      },
      subContainer:{
        overflow: 'hidden',
        position: 'relative',
        '&:hover $hoverEffect':{
            display: 'block'
        },
      },
      subContainer1:{
        gridColumnStart: '1',
        gridColumnEnd: '3',
        overflow: 'hidden',
        position: 'relative'
      },
      welcome:{
        position: 'absolute',
        color: 'white',
        top: '18%',
        left: '8%',
        [theme.breakpoints.down('sm')]: {
          margin: 'auto',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          textAlign: 'center'
        },
      },
      subWelcome: {
        position: 'absolute',
        color: 'white',
        bottom: '20%',
        right: '5%',
        [theme.breakpoints.down('sm')]: {
          margin: 'auto',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          textAlign: 'center'
        },
      },
      hoverEffect: {
        zIndex: '5',
        position: 'absolute',
        display: 'none',
        width: '100%',
        height: '50px',
        margin: '5px',
        marginBottom: '0px',
        color: 'white',
        textShadow: '1px 1px black',
        bottom: '0',
      }
}));