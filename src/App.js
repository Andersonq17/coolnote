import React, { Component } from 'react'
import './App.css';
import SideBar from './sidebar/sidebar';
import Editor from './editor/editor'

const firebase= require('firebase');

export default class App extends Component {
  constructor(){
    super()

    this.state={
      notaIndex: null,
      notaSeleccionada:null,
      notas:null
    }
  }

  componentDidMount(){
    firebase.firestore().collection('notas').onSnapshot(serverUpdate =>{
      const notas = serverUpdate.docs.map(doc=> {
        const data= doc.data();
        data['id']= doc.id;
        return data;
      });
      this.setState({notas: notas})
    });
  }
  render() {
    return (
      <div className="app-container">
       <SideBar 
       notaIndex={this.state.notaIndex} 
       notas={this.state.notas}
       borrarNota={this.borrarNota}
       notaSeleccionada={this.notaSeleccionada}
       nuevaNota={this.nuevaNota}>

       </SideBar>
      {
        this.state.notaSeleccionada ? 
        <Editor 
        notaSeleccionada={this.state.notaSeleccionada}
        notaIndex={this.state.notaIndex}
        notas={this.state.notas}
        notaActualizada={this.notaActualizada}/> : null
      }
      </div>
    )
  }
  notaSeleccionada= (nota,index)=>this.setState({notaIndex: index, notaSeleccionada:nota })

  notaActualizada = (id,notaObj)=> {
    firebase.firestore().collection('notas')
    .doc(id)
    .update({titulo: notaObj.titulo, contenido: notaObj.contenido, timestamp: firebase.firestore.FieldValue.serverTimestamp()})
  }

  nuevaNota = async(titulo)=>{
    const nota= {titulo: titulo, contenido:''};
    const nueva= await firebase.firestore().collection('notas').add({titulo:nota.titulo, contenido:nota.contenido, timestamp:firebase.firestore.FieldValue.serverTimestamp()});
    const nuevaId= nueva.id;
    await this.setState({notas : [...this.state.notas, nota]});
    const nuevaNotaIndex = this.state.notas.indexOf(this.state.notas.filter(_note=> _note.id === nuevaId)[0]);
    this.setState({notaSeleccionada:this.state.notas[nuevaNotaIndex],notaIndex:nuevaNotaIndex})
  } 

  borrarNota= async(nota)=>{
    const notaIndex= this.state.notas.indexOf(nota);
    await this.setState({notas : this.state.notas.filter(_nota => _nota !== nota)})
    if(this.state.notaSeleccionada === notaIndex){
      this.setState({notaIndex: null, notaSeleccionada:null})
    }else{
      this.state.notas.length > 1 ?
      this.notaSeleccionada(this.state.notas[this.state.notaIndex -1 ], this.state.notaIndex -1 ) :
      this.setState({notaIndex: null, notaSeleccionada:null});
    }
    firebase.firestore()
    .collection('notas')
    .doc(nota.id)
    .delete();
  }
}


