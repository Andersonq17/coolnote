import { Link } from 'react-router-dom';
import React, {Component} from 'react';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const firebase= require('firebase');

class Login extends Component {
    constructor(){
        super();
        this.state={
            email:null,
            pass:null,
            logErr:'',
        }
    }
    render() {
        const {classes}= this.props;

        return (
            <main className={classes.main}>
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h5'>Iniciar Sesión</Typography>
                    <form className={classes.form} onSubmit={(e)=>{this.submitLogin(e)}}>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='Login-email'>Ingresa tu email</InputLabel>
                            <Input autoComplete='email' autoFocus id='Login-email' onChange={(e)=>this.usuEscribe('email',e)}></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='password-login'>Contraseña</InputLabel>
                            <Input type='password' id='password-login' onChange={(e)=>this.usuEscribe('password',e)}></Input>
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Inicia Sesión</Button>
                    </form>
                    {
                        this.state.logErr ? 
                        <Typography component='h5' variant='h6' className={classes.errorText}>Información Incorrecta</Typography>: null
                    }
                    <Typography variant='h6' component='h5' className={classes.noAccountHeader}>¿No tienes cuenta?</Typography>
                    <Link className={classes.signUpLink} to='/registro'>Registrate!</Link>
                </Paper>
            </main>
        )
    }
    submitLogin=(e)=>{
        e.preventDefault();
        firebase.auth()
        .signInWithEmailAndPassword(this.state.email,this.state.pass)
        .then(()=>{
            this.props.history.push('/dashboard');
        },err=>{
            this.setState({logErr: 'Error de servidor'});
            console.log(err);
        });
    }
    usuEscribe=(tipo,e)=>{
        switch (tipo) {
            case 'email':
                this.setState({email:e.target.value});
                break;
                case 'password':
                this.setState({pass:e.target.value});
                break;
        
            default:
                break;
        }
    }
}

export default withStyles(styles)(Login)