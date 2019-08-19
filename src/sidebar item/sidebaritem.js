import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItem extends Component {
    
    render() {

        const { _index, _nota, classes, notaIndex } = this.props;
        //
        return (
            <div key={_index}>
                <ListItem
                className={classes.listItem}
                selected={notaIndex===_index}
                alignItems='flex-start'>
                    <div className={classes.textSection}
                    onClick={()=>this.notaSeleccionada(_nota,_index)}>
                        <ListItemText
                        primary={_nota.titulo}
                        secondary={removeHTMLTags(_nota.contenido.substring(0,30) + '....')}>
                        </ListItemText>
                    </div>
                    <DeleteIcon 
                    onClick={()=>this.borrarNota(_nota)}
                    className={classes.iconoBorrar}>
                    </DeleteIcon>
                </ListItem>
            </div>
        )
    }
    notaSeleccionada = (n,i)=> this.props.notaSeleccionada(n,i);
    borrarNota = (n)=> {
        if(window.confirm(`¿Estas seguro que quieres borrar:  ${n.titulo} ?`)) {
            this.props.borrarNota(n);
        }
    }
}

export default withStyles(styles)(SidebarItem);