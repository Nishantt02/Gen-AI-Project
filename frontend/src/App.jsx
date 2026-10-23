import React from 'react'
import { RouterProvider } from 'react-router-dom'
import {router} from './app.router.jsx'
import { AuthProvider } from './features/auth.context.jsx'
import { Interviewprovider } from './features/interview.context.jsx'

function App() {
  return (
    <div>
      <AuthProvider>
        <Interviewprovider>
        <RouterProvider router={router} />
        </Interviewprovider>
      </AuthProvider>
    </div>
    
  )
}

export default App
