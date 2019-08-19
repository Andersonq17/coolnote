import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import {Divider, Button} from '@material-ui/core';
import SidebarItemComponent from '../sidebar item/sidebaritem'


 class Sidebar extends Component {
     constructor(){
         super();
         this.state={
            addingNota: false,
            titulo:null,
         };
     }
    render() {

        const {notas, classes, notaIndex} = this.props;
        if(notas){
            
        return (
            <div className={classes.sidebarContainer}>
                <Button
                onClick={this.nuevaNota}
                className={classes.newNoteBtn}>
                   {this.state.addingNota ? 'Cancelar': 'Nueva Nota'}
                </Button>

                {
                    this.state.addingNota ? 
                    <div>
                        <input type="text" className={classes.newNoteInput} 
                        placeholder="Ponle titulo a tu nota"
                        onKeyUp={(e)=> this.actTitulo(e.target.value)}>
                            
                        </input>
                        <Button className={classes.newNoteSubmitBtn} onClick={this.guardarNota}>
                            Guardar
                        </Button>
                    </div> : null
                }
                <List>
                    {
                        notas.map((_nota,_index) =>{
                            return(
                                <div key={_index}>
                                    <SidebarItemComponent
                                    _nota={_nota}
                                    _index={_index}
                                    notaIndex={notaIndex}
                                    notaSeleccionada={this.notaSeleccionada}
                                    borrarNota={this.borrarNota}>
                                    </SidebarItemComponent>
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
        }else {
            return(
            <div>
               
            </div>
            )
        }
    }
    nuevaNota= ()=>{
        this.setState({titulo : null, addingNota: !this.state.addingNota})
        
    }
    actTitulo = (txt)=>{
        this.setState({titulo:txt})
    }
    guardarNota=()=>{
        this.props.nuevaNota(this.state.titulo);
        this.setState({titulo:null,addingNota:false})
    }
    notaSeleccionada=(n,i)=>{
        this.props.notaSeleccionada(n,i);
    }

    borrarNota= (nota)=>{
        this.props.borrarNota(nota);
    }
}
export default withStyles(styles)(Sidebar);
