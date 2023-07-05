import { Home } from '../pages'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => (
  <Routes>
    <Route 
      path='/' 
      element={
        <Home></Home>
      } 
    />
  </Routes>
)

export default AppRoutes