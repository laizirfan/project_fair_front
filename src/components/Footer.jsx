import { faFacebook, faInstagram, faLinkedinIn, faTwitter, faUncharted, faWpbeginner } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className='mt-5 w-100 p-4 ' style={{backgroundColor:'lightblue'}}>
      <div className='row'>

        <div className="col-md-4">  <h3> <FontAwesomeIcon icon={faUncharted} className='me-2' />Projects</h3>
            <p style={{textAlign:'justify',color:'black'}}> Lorem ipsum dolor  Dolore vel quod sit corrupti culpa odit asperiores dolor molestiae  consequatur molestias dignissimos, nobis quibusdam.
            </p></div>
        <div className="col-md-1 ">
          
        </div>
        <div className="col-md-1">
            <h3>Links</h3>
          <Link style={{textDecoration:'none',color:'black'}} to={'/'}>  <p>Home</p></Link>
           <Link style={{textDecoration:'none',color:'black'}} to={'/project'}> <p>Projects</p></Link>
           <Link  style={{textDecoration:'none',color:'black'}}to={'/dashboard'}> <p>DashBoard</p></Link>

        </div>
        <div className="col-md-1"> </div>
        
        <div className="col-md-2">
            <h3>Guides</h3>
            <Link style={{textDecoration:'none',color:'black'}} to={'https://react.dev'}>  <p>React</p></Link>
           <Link style={{textDecoration:'none',color:'black'}} to={'https://react-bootstrap.github.io'}> <p>React-Bootstrap</p></Link>
           <Link  style={{textDecoration:'none',color:'black'}}to={'https://bootswatch.com'}> <p>React-bootswatch</p></Link>
        </div>
        <div className="col-md-3">
            <h3>Contact Us</h3>
            <div className='d-flex'>
                <input type="text"  placeholder='Enter E-mail' className='form-control' />
                <button className='btn btn-warning ms-3'>Subscribe</button>

            </div>
            <div className='d-flex justify-content-between mt-3'>
            <FontAwesomeIcon icon={faInstagram}  size="2x" className='text-dark' />
            <FontAwesomeIcon icon={faTwitter} size="2x" className='text-dark' />
            <FontAwesomeIcon icon={faFacebook} size="2x" className='text-dark' />
            <FontAwesomeIcon icon={faLinkedinIn} size="2x" className='text-dark'/>
            </div>
        </div>
     


      </div>



    <p className='text-center text-dark mt-5'> Copyright©2024 Project fair.Build with React</p>
    </div>
  
    </>

  )
}

export default Footer