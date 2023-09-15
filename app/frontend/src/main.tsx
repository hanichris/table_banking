import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { store } from './store'
import './index.css'
// import App from './App.tsx'
import { router } from './routes.tsx'
// import NoPage from './pages/NoPage.tsx'
// import { UsersProvider } from './context/userContext.tsx'

// Perform / trigger the inital render.
// It targets the target DOM node referenced by the id `root`.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
