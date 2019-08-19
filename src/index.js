import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Login from './login/login';
import Registro from './registro/registro';
import Dashboard from './dashboard/dashboard';

const firebase = require('firebase');
require('firebase/firestore');

 
 const firebaseConfig = {
    apiKey: "AIzaSyC9ZJ3vx6DWQLWH8xmUnCYTKkMtovzv3Tg",
    authDomain: "coolnote-976f5.firebaseapp.com",
    databaseURL: "https://coolnote-976f5.firebaseio.com",
    projectId: "coolnote-976f5",
    storageBucket: "coolnote-976f5.appspot.com",
    messagingSenderId: "112059677905",
    appId: "1:112059677905:web:a99d17686be4c8dc"
  };

 
  firebase.initializeApp(firebaseConfig);

 const routing = (
  <Router>
    <div id='routing-container'>
      <Route path='/login' component={Login}></Route>
      <Route path='/registro' component={Registro}></Route>
      <Route path='/dashboard' component={Dashboard}></Route>
    </div>
  </Router>
 );

ReactDOM.render(routing, document.getElementById('coolnote-container'));


serviceWorker.unregister();
