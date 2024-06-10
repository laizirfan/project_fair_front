import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import imgtit from '../assets/des.svg.png'
import imx from '../assets/remove.png'
import { Link } from 'react-router-dom'
import ProCards from '../components/ProCards'
import { gethomeProjectApi } from '../services/allAPI'
function Home() {
  const [isLogin, setIsLogin] = useState('false')

 const[homeProject,setHomeProject] = useState([])


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true)
    }
    else {
      setIsLogin(false)
    }
    getHomeProject()
  }, [])


  const getHomeProject = async()=>{
    const result = await gethomeProjectApi()
    setHomeProject(result.data)
  }
  console.log(homeProject);

  return (
    <>
      <div className='container-fluid w-100 ' style={{ backgroundColor: 'lightblue', height: '100vh' }}>
        <Row className='align-items-center p-4'>
          <Col sm={12} md={6}>
            <h1 className='text-dark' style={{ fontSize: '69px' }}>Project-Exibit</h1>
            <p className='text-dark'>One stop destination for all software development projects</p>


            {!isLogin ?
              <button className='btn btn-warning rounded'><Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>
                Get Started <FontAwesomeIcon icon={faArrowRight} /></Link></button>
              :
              <button className='btn btn-warning ms-3'><Link to={'/dashboard'}
                style={{ textDecoration: 'none', color: 'white' }} >Manage Projects
                <FontAwesomeIcon icon={faArrowRight} /></Link> </button>}

          </Col>
          <Col sm={12} md={6}>
            <img className='mt-5 ms-5' src={imx} alt="img" style={{ width: '400px' }} />

          </Col>
        </Row>
      </div>
      <div className='text-dark mt-5 text-center'>
        <h1>Explore the Projects</h1>

        <marquee scrollAmount={30} >
          <div className='d-flex '>
          
          {homeProject?.map((item)=>(
         <ProCards project={item}/>  ))
         }
        
           
        
           
          </div>
        </marquee>

        <Link to={'/project'} style={{ textDecoration: 'none' }}> <p className='text-center mt-4 text-danger '><b>See more projects</b></p> </Link>

      </div>

    </>
  )
}

export default Home