import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {WorkBoxProvider} from "react-workbox";

ReactDOM.render(<WorkBoxProvider interval={30*1000}><App /></WorkBoxProvider>, document.getElementById('root'));

