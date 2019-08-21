import React, { Component } from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles'
import { AppBar, Toolbar, Typography,IconButton,Button, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

 class Home extends Component {
    render() {
        const {classes}= this.props;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        CoolNote
                    </Typography>
                    <Link to='/login' className={classes.headerLinks}>
                        <Button color="inherit">Iniciar sesión</Button>
                    </Link>
                    <Link to='/registro'className={classes.headerLinks}>
                        <Button color="inherit">Registrarse</Button>
                    </Link>
                   
                    </Toolbar>
                </AppBar>
                <Grid item xs={12} >
                    <img src='./img/paper1.jpg'></img>
                     <Typography className={classes.tituloHome} variant='h2' component='h5'>CoolNote App</Typography>
                     <Typography className={classes.tituloHome} variant='subtitle1'>App hecha para que tomes notas y no se te olvide nada.</Typography>
                 
                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(Home)
