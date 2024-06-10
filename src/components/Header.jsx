import { faUncharted } from '@fortawesome/free-brands-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Container, Navbar, NavbarBrand } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthoContext } from '../context/ContextSh'

function Header({dash}) {


  const navigate = useNavigate()
  const{setIsAuthorized} = useContext(isAuthoContext)

  const handleLogout= ()=>{
  sessionStorage.removeItem("existingUser")
  sessionStorage.removeItem("token")
  setIsAuthorized(false)
  navigate('/')
 
  }
 
  return (
    <Navbar style={{backgroundColor:'lightblue'}}>
      <Container>
      <Link to={'/'} style={{textDecoration:'none'}}>
        <NavbarBrand className='text-dark' >
        <FontAwesomeIcon icon={faUncharted} size='xl' />
       <span className='fs-4 ms-3' > Project-Exibit</span>
        </NavbarBrand>
  </Link>

 { dash &&<button  onClick={handleLogout} className='btn btn-danger'> <FontAwesomeIcon icon={faPowerOff} className='me-2 '  />Logout</button>}
      </Container>
    </Navbar>
  )
}

export default Header