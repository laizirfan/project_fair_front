//both register and log
import { faUncharted } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, json, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginApi, registerApi } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthoContext } from '../context/ContextSh'

function Auth({ register }) {

const{setIsAuthorized} = useContext(isAuthoContext)



  //states
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""

  })
  console.log(user);

  //for navigation
  const navigate = useNavigate()
  const registerForm = register ? true : false
  //fn for api call register

  const getregister = async (e) => {
    e.preventDefault()
    const { username, email, password } = user
    if (!username || !email || !password) {
      toast.info('please fill the form')
    }
    else {
      const result = await registerApi(user)
      console.log(result);

      if (result.status == 200) {
        toast.success('Registration successful')
        setUser({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')

      }
      else {
        toast.error(result.response.data)
      }
    }




  }

  //for login

  const userLogin = async (e) => {
    e.preventDefault()
    const { email, password } = user
    if (!email || !password) {
      toast.info('Please fill the form completely')

    }
    else {
      const result = await loginApi(user)
      console.log(result);

      if (result.status == 200) {
        toast.success('Login Success')
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.exsistingUser))
        sessionStorage.setItem("token", result.data.token)

        setUser({

          email: "",
          password: ""
        })

        setTimeout(() => {
          navigate("/")
        }, 3000)
        setIsAuthorized(true)


      }
      else {
        toast.error('Something went wrong')
        console.log(result);
      }
    }

  }


  return (
    <div className='w-100 d-flex justify-content-center align-items-center flex-column' style={{ height: '100vh' }}>

      <div className=' w-75 container'>


        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <h5> <FontAwesomeIcon icon={faArrowLeft} className='mx-3' />
            Back to home <FontAwesomeIcon icon={faHouse} /></h5></Link>


        <div style={{ backgroundColor: 'lightblue' }} className='rounded mt-3'>

          <Row>
            <Col sm={12} md={6} className='p-5'>
              <img src="https://png.pngtree.com/png-vector/20191003/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1786166.jpg" className='w-100' alt="" />
            </Col>
            <Col sm={12} md={6} className=' d-flex justify-content-center align-items-center flex-column' >
              <h3 className='text-dark mt-4'> <FontAwesomeIcon icon={faUncharted} className='mx-2 ' /> Project-Exibit</h3>

              {registerForm ?
                <h6 className='text-dark mt-3 '>Sign up to your account</h6>
                :
                <h6 className='text-dark mt-3'>Sign in to your account</h6>}

              <Form className='mt-5 w-75'>


                {registerForm &&
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                  </Form.Group>}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </Form.Group>

                {registerForm ?
                  <div>
                    <Button variant="primary" className='w-100' type="submit" onClick={getregister}>
                      Register
                    </Button>
                    <p className='text-dark mt-2'>Already user?click here to  <Link to={'/login'} className='text-danger'>Login</Link></p>
                  </div>
                  :
                  <div>
                    <Button variant="primary" onClick={userLogin} className='w-100' type="submit">
                      Login
                    </Button>
                    <p className='text-dark mt-2'>New user?click here to
                      <Link to={'/register'} className='text-danger'>Register</Link></p>

                  </div>}


              </Form>


            </Col>
          </Row>


        </div>
      </div>


      <ToastContainer theme='colored' autoClose={2000} position='top-center' />
    </div>
  )
}

export default Auth