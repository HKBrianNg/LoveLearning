import { useState } from 'react'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import Logoff from './pages/Logoff'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home goLogin={() => setCurrentPage('login')} />
      case 'login': return <Login goHome={() => setCurrentPage('home')} />
      case 'forget': return <ForgetPassword goHome={() => setCurrentPage('home')} />
      case 'logoff': return <Logoff goHome={() => setCurrentPage('home')} />
      default: return <Home />
    }
  }

  return (
    <MainLayout onNavigate={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  )
}

export default App