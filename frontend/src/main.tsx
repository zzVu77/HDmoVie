import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Sample for using react-router */}
    {/* <RouterProvider router={router} /> */}
    <App />
  </StrictMode>,
)
