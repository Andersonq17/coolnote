import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import debounce from '../helpers' ;
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {withStyles} from '@material-ui/core/styles'
import styles from './styles'

class Editor extends Component {
    constructor(){
        super();
        this.state={
            titulo:'',
            contenido:'',
            id:'',
        };
    }

    componentDidMount = ()=>{
        this.setState({
            titulo:this.props.notaSeleccionada.titulo,
            contenido: this.props.notaSeleccionada.contenido,
            id:this.props.notaSeleccionada.id,
        })
    }

    componentDidUpdate= ()=>{
       if(this.props.notaSeleccionada.id !== this.state.id)
       this.setState({
        titulo:this.props.notaSeleccionada.titulo,
        contenido: this.props.notaSeleccionada.contenido,
        id:this.props.notaSeleccionada.id,
    })
    }
    render() {
       
        const {classes} = this.props;

        return (
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input className={classes.titleInput}
                    placeholder="Titulo de la nota"
                    value={this.state.titulo ? this.state.titulo : ''}
                    onChange={(e)=> this.actTitulo(e.target.value)}/>
                    
                <ReactQuill 
                value={this.state.contenido} 
                onChange={this.updateContenido}>

                </ReactQuill>

            </div>
        )

    }
    updateContenido = async(val)=>{
        await this.setState({contenido: val});
        this.update();
    };
    actTitulo= async(txt)=>{
        await this.setState({titulo:txt});
        this.update();
    }

    update=debounce(()=>{
       this.props.notaActualizada(this.state.id, { titulo: this.state.titulo, contenido: this.state.contenido})
    }, 2500);

}
export default withStyles(styles)(Editor)