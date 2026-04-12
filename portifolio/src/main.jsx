import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppErrorBoundary from './components/AppErrorBoundary.jsx'
import App from './App.jsx'
import Admin from './pages/Admin.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <RouterProvider router={router} />
    </AppErrorBoundary>
  </StrictMode>,
)
