import './styles/bootstrap.3.3.7.css'
import './styles/bootstrap-theme.min.css'
import './style.css'
import './styles/transition-styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import 'react-block-ui/style.css'

ReactDOM.render(
  <div>
    <BrowserRouter>
      <App title="React Webpack boiler plate with Jake" />
    </BrowserRouter>
    <div id="firebaseui-auth-container" />
  </div>,
  document.getElementById('app-react-root')
)
