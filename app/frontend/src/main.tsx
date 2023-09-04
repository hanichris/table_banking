import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UsersProvider } from './context/userContext.tsx'

// Perform / trigger the inital render.
// It targets the target DOM node referenced by the id `root`.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UsersProvider>
      <App />
    </UsersProvider>
  </React.StrictMode>,
)
