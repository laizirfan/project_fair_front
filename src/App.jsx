
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Project from './pages/Project'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import Add from './components/Add'
import { useContext } from 'react'
import { isAuthoContext } from './context/ContextSh'

function App() {
const{isAuthorized} = useContext(isAuthoContext)

 
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/project' element={<Project/>}/>
      <Route path='/dashboard' element={isAuthorized?<Dashboard dashboard ={true}/> : <Home/> }/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/login' element={<Auth />}/>

    </Routes>
    <Footer/>
    
    
    
    </>
  )
}

export default App
