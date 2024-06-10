import React, { useEffect, useState } from 'react'
import Add from '../components/Add'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Profile from '../components/Profile'
import MyProject from '../components/MyProject'

function Dashboard({ dashboard }) {
  const dash = dashboard
  const[username,setUserName] = useState("")

useEffect(()=>{
if(sessionStorage.getItem("existingUser")){
  setUserName(JSON.parse(sessionStorage.getItem("existingUser")).username)

}
},[])
console.log(username);

  return (
    <div>
      <Header dash={dash} />

      <div className='mt-5'>
        <h3 className='ms-5'>Welcome <span className='text-info'><b>{username}</b>!!</span></h3>

        <Row className='mt-4'>
          <Col sm={12} md={8}>
            <MyProject />
          </Col>
          <Col sm={12} md={4}>
            <Profile />
          </Col>
        </Row>
      </div>

    </div>
  )
}

export default Dashboard