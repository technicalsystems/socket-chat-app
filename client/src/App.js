import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/app.routes'
import { AttachContext } from './utils/context'
import './App.scss'
import { useState } from 'react'

function App() {

  const [ showAttachment, setShowAttachment ] = useState(false)

  return (
    <BrowserRouter>
      <AttachContext.Provider value={[ showAttachment, setShowAttachment ]}>
        <AppRoutes></AppRoutes>
      </AttachContext.Provider>
    </BrowserRouter>
  )
}

export default App