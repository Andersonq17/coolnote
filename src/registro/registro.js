import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseLine from '@material-ui/core/CssBaseline';
import TypoGraphy from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './styles'
const firebase = require('firebase');

 class Registro extends Component {
     constructor(){
         super();
         this.state={
            email:null,
            pass:null,
            passConf:null,
            regError:''
         };
     }
    render() {

        const {classes} = this.props;

        return (
            <main className={classes.main}>
                <CssBaseLine>
                    <Paper
                    className={classes.paper}>
                        <TypoGraphy component='h1' variant='h5'>Registro de usuario</TypoGraphy>
                        <form className={classes.form} onSubmit={(e)=>{this.submitRegistro(e)}}>
                            <FormControl
                            required fullWidth margin='normal'>
                                <InputLabel htmlFor='registro-email'>Ingresa tu email</InputLabel>
                                <Input autoComplete='email' onChange={(e)=>{this.usuEscribe('email',e)}} autoFocus id='registro-email'></Input>
                            </FormControl>
                            <FormControl required fullWidth margin='normal'>
                                <InputLabel htmlFor='password-registro'>Contraseña</InputLabel>
                                <Input type='password' id='password-registro'onChange={(e)=>{this.usuEscribe('password',e)}}></Input>
                            </FormControl>
                            <FormControl required fullWidth margin='normal'>
                                <InputLabel htmlFor='password-registro-confirmar'>Confirmar Contraseña</InputLabel>
                                <Input type='password' id='password-registro-confirmar'onChange={(e)=>{this.usuEscribe('passwordConfirmar',e)}}></Input>
                            </FormControl>
                            <Button type='submit' fullWidth variant='contained'color='primary' className={classes.submit}>Registrar</Button>
                        </form>
                        {
                            this.state.regError ?
                            <TypoGraphy className={classes.errorText} component='h5' variant='h6'>
                                {this.state.regError}
                            </TypoGraphy>: null
                        }
                        <TypoGraphy component='h5' variant='h6' className={classes.hasAccountHeader}>
                            ¿Ya tienes una cuenta? 
                        </TypoGraphy> 
                        <Link className={classes.logInLink} to='/login'>Inicia Sesión</Link>
                    </Paper>
                </CssBaseLine>
            </main>
        )
    }

    submitRegistro= (e) =>{
        e.preventDefault();
        if(!this.validarPass){
            this.setState({regError:'La contraseña no coincide'});
            return;
        }else{
            firebase.auth()
            .createUserWithEmailAndPassword(this.state.email,this.state.pass)
            .then(authRes =>{
                const userObj = {
                    email: authRes.user.email,
                };
                firebase.firestore()
                .collection('usuarios')
                .doc(this.state.email)
                .set(userObj)
                .then(()=>{this.props.history.push('/dashboard')
                 }, dbError=>{
                    console.log(dbError);
                    this.setState({regError: 'Falló al agregar usuario'})
                 })
            },authErr=>{
                console.log(authErr);
                this.setState({regError: 'Falló al agregar usuario'})
            })
        }

    }
    usuEscribe =(tipo,e)=>{
        switch (tipo) {
            case 'email':
                this.setState({ email: e.target.value});
                break;
            case 'password':
                this.setState({ pass: e.target.value});
                break;
                case 'passwordConfirmar':
                this.setState({ passConf: e.target.value});
                break;
            default:
                break;
        }
    }

    validarPass= ()=> this.state.pass=== this.state.passConf;
}
export default withStyles(styles)(Registro);