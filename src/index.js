import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <App title="React Webpack boiler plate with Jake" />
  </BrowserRouter>,
  document.getElementById('app-react-root')
)
