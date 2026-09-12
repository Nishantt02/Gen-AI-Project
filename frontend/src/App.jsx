import React from 'react'
import { RouterProvider } from 'react-router-dom'
import {router} from './app.router.jsx'
import { AuthProvider } from './features/auth.context.jsx'

function App() {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
    
  )
}

export default App
