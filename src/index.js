import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDlkUxdHRjfUNCNWX81I79YqSiQMpNs4s0",
    authDomain: "actandcare-5cf3c.firebaseapp.com",
    databaseURL: "https://actandcare-5cf3c.firebaseio.com",
    projectId: "actandcare-5cf3c",
    storageBucket: "actandcare-5cf3c.appspot.com",
    messagingSenderId: "827295470651"
  };
  firebase.initializeApp(config);


ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
