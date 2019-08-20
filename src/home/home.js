import React, { Component } from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core';

 class Home extends Component {
    render() {
        return (
            <div>
                <Container>
                    <AppBar position='static' color='default'>
                        <Toolbar>
                            <Typography variant='h6' color='inherit'>
                                CoolNote
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Container>
            </div>
        )
    }
}
export default withStyles(styles)(Home)
