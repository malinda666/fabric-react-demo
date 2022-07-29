import React from 'react'
import ReactDOM from 'react-dom'

import { CanvasProvider } from 'context/CanvasContext'
import App from 'App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <CanvasProvider>
      <App />
    </CanvasProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
