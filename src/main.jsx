import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Clock from './Clock.jsx'
import Names from './Names.jsx'
import NamePicker from './NamePicker.jsx'
import ApiFetcher from './ApiFetcher.jsx'
import ErrorPage from './routes/error-page.jsx'
import Root from './routes/root.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/taradiddle/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'app',
        element: <App />
      },
      {
        path: 'clock',
        element: <Clock />
      },
      {
        path: 'namepicker',
        element: <NamePicker />
      },
      {
        path: 'apifetcher',
        element: <ApiFetcher />
      },
      {
        path: 'names',
        element: <Names />
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
