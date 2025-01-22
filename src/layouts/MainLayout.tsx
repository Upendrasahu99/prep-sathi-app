import { Outlet } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import MainContextProvider from '../contexts/MainContextProvider'

const MainLayout = () => {
  return (
    <MainContextProvider>
      <div>
        <Navbar/>
        <Outlet/>
      </div>
    </MainContextProvider>
  )
}

export default MainLayout