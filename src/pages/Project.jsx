import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons'
import { Col, Row } from 'react-bootstrap'
import ProCards from '../components/ProCards'
import { Link } from 'react-router-dom'
import { allProjectApi } from '../services/allAPI'

function Project() {
  const [allProduct, seAllProject] = useState([])
  const [token, setToken] = useState("")
  const[searchKey,setSearchKey] =useState("")

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      getAllProject()
    }
  }, [searchKey])

  const getAllProject = async () => {
    const result = await allProjectApi(searchKey)
    seAllProject(result.data)
  }
  console.log(allProduct);
  console.log(searchKey);

  return (
    <>
      <Header />

      <div className='text-center mt-4'>
        <h2 className='text-center mt-3  text-dark'> All Projects</h2>
      </div>

      {token ?
        <div>


        {allProduct?.length>0?
          <div>
            <div className='row mt-5 d-flex justify-content-center w-100 '>
              <div className="col-md-4"></div>
              <div className="col-md-4 p-4 d-flex justify-content-center">
                <input type="text" className='form-control  ' placeholder='Search by Technologies' onChange={(e)=>setSearchKey(e.target.value)} />
                <FontAwesomeIcon icon={faSearchengin} rotation={90} className='text-secondary' size='xl'
                  style={{ marginTop: '10px', marginLeft: '-30px' }} />

              </div>
              <div className="col-md-4"></div>


            </div>

            <Row className='mt-5'>

             {allProduct.map((item)=>(  <Col sm={12} md={6} lg={4} className='p-4'>
                <ProCards project={item} />
              </Col>))
           }

            </Row>
          </div> 
          :
        
            <div
              className='mt-5'>
              <h1 className='text-center text-danger'>No Project to display</h1>
            </div>}
          
        </div>


        :

        <div className='d-flex justify-content-center align-items-center text-column'>
          <img src="https://cdn.dribbble.com/users/756147/screenshots/2494603/unlock_animaiton.gif" style={{ width: '16%' }} alt="" />

          <h3 className='mt-4 text-danger'>Please <Link to={'/login'} style={{ textDecoration: 'none' }}>Login</Link> to see more project</h3>
        </div>}


    </>
  )
}

export default Project